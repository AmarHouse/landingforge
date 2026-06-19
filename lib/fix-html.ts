/**
 * HTML Auto-Closure Utility
 * Fixes truncated HTML by closing unclosed tags (</script>, </body>, </html>).
 * This handles the common case where the AI model runs out of tokens mid-generation.
 */

export function fixTruncatedHtml(html: string): string {
  let fixed = html;

  // 1. Close unclosed <script> tags
  // Count opens vs closes
  const scriptOpens = (fixed.match(/<script[\s\S]*?>/g) || []).length;
  const scriptCloses = (fixed.match(/<\/script>/g) || []).length;
  const unclosedScripts = scriptOpens - scriptCloses;

  if (unclosedScripts > 0) {
    // Find where the last <script> opens and truncate from there if content is garbled
    const lastScriptOpen = fixed.lastIndexOf('<script');
    const lastScriptClose = fixed.lastIndexOf('</script>');

    if (lastScriptOpen > lastScriptClose) {
      // The last script tag was never closed — close it
      // First, try to find a reasonable cutoff point
      // If the content after the last script open looks incomplete (no semicolons, no closing braces),
      // truncate to the last complete statement
      const scriptContent = fixed.substring(lastScriptOpen);
      const lastSemicolon = scriptContent.lastIndexOf(';');
      const lastBrace = scriptContent.lastIndexOf('}');
      const cutoff = Math.max(lastSemicolon, lastBrace);

      if (cutoff > 10) {
        // Keep up to the last complete statement, then close
        fixed = fixed.substring(0, lastScriptOpen) + scriptContent.substring(0, cutoff + 1) + '\n    </script>';
      } else {
        // No good cutoff — just close the tag
        fixed += '\n    </script>';
      }
    }

    // If still have unclosed scripts (multiple), close them
    const remainingOpens = (fixed.match(/<script[\s>]/g) || []).length;
    const remainingCloses = (fixed.match(/<\/script>/g) || []).length;
    for (let i = 0; i < remainingOpens - remainingCloses; i++) {
      fixed += '\n</script>';
    }
  }

  // 2. Close unclosed <style> tags
  const styleOpens = (fixed.match(/<style[\s\S]*?>/g) || []).length;
  const styleCloses = (fixed.match(/<\/style>/g) || []).length;
  for (let i = 0; i < styleOpens - styleCloses; i++) {
    fixed += '\n</style>';
  }

  // 3. Close unclosed <body> tag
  if (fixed.includes('<body') && !fixed.includes('</body>')) {
    fixed += '\n</body>';
  }

  // 4. Close unclosed <html> tag
  if (fixed.includes('<html') && !fixed.includes('</html>')) {
    fixed += '\n</html>';
  }

  return fixed;
}

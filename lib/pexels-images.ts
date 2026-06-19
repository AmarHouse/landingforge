/**
 * Pexels Image Library
 * Categorized photo IDs for use in AI-generated landing pages.
 * All images are free to use under the Pexels license.
 *
 * URL format: https://images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg?auto=compress&cs=tinysrgb&w={width}&dpr=1
 */

export type ImageCategory =
  | 'hero-hotel'
  | 'hero-restaurant'
  | 'hero-tech'
  | 'hero-business'
  | 'hero-nature'
  | 'hero-food'
  | 'hero-fitness'
  | 'hero-travel'
  | 'about'
  | 'team'
  | 'office'
  | 'food'
  | 'nature'
  | 'tech'
  | 'fitness'
  | 'travel'
  | 'lifestyle'
  | 'architecture';

/** Pexels photo IDs organized by category */
export const PEXELS_PHOTOS: Record<ImageCategory, number[]> = {
  'hero-hotel': [338504, 271639, 261102, 164595, 274598],
  'hero-restaurant': [3184416, 262897, 1307698, 941861, 2253643],
  'hero-tech': [3255275, 1181298, 3861969, 1775573, 2582434],
  'hero-business': [3183197, 3184292, 3182812, 3205761, 3760067],
  'hero-nature': [1287145, 1470405, 1525041, 1072179, 1767434],
  'hero-food': [1640777, 958545, 262959, 1099680, 1437556],
  'hero-fitness': [1552242, 3289711, 2294361, 4753988, 1432759],
  'hero-travel': [3156482, 2506923, 2404843, 176837, 1032650],
  'about': [3182812, 3184291, 3182786, 3183197],
  'team': [3184292, 3205761, 3760067, 3182812],
  'office': [3184465, 3182812, 3184291],
  'food': [1640777, 262959, 958545, 1099680],
  'nature': [1287145, 1470405, 1072179, 1525041],
  'tech': [1181298, 3861969, 2582434, 1775573],
  'fitness': [1552242, 3289711, 2294361],
  'travel': [3156482, 2506923, 2404843, 176837],
  'lifestyle': [1488463, 1484759, 1040173],
  'architecture': [3184465, 3182812, 3184291],
};

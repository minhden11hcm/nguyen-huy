/**
 * Sums all numbers from 1 to n.
 *
 * @param {number} n - upper limit of the summation
 * @description
 * This function have complexity O(n)
 * @returns {number} sum of all numbers from 1 to n
 */
function sum_to_n_a(n: number): number {
  let sum = 0;

  for (let i = 1; i <= n; i++) {
    sum += i;
  }

  return sum;
}

/**
 * Sums all numbers from 1 to n using the formula n * (n + 1) / 2.
 *
 * @param {number} n - upper limit of the summation
 * @description
 * This function have complexity O(1)
 * @returns {number} sum of all numbers from 1 to n
 */
function sum_to_n_b(n: number): number {
  return (n * (n + 1)) / 2;
}

/**
 * Recursively sums all numbers from 1 to n.
 *
 * @param {number} n - upper limit of the summation
 * @description
 * This function uses recursion to calculate the sum of all numbers from 1 to n.
 * It has a time complexity of O(n) due to the recursive calls.
 * @returns {number} sum of all numbers from 1 to n
 */
function sum_to_n_c(n: number): number {
  if (n === 1) {
    return 1;
  } else {
    return n + sum_to_n_c(n - 1);
  }
}

# 🟢 83. Remove Duplicates from Sorted List

#### #leetcode #interview

## Question:

- Given the `head` of a sorted linked list, *delete all duplicates such that each element appears only once*. Return *the linked list **sorted** as well*

### Example:

![Untitled](83%20Remove%20Duplicates%20from%20Sorted%20List%20772a956d64594465bf288b2b9f951243/Untitled.png)

```
Input: head = [1,1,2,3,3]
Output: [1,2,3]
```

## Solution:

**Approach**

- I created **two** nodes
    - **`keep`** : updated only duplicates are found
    - **`curr`** : updated every timev
- I used **nested** while loop to remove the duplicates
    - The outer loop iterates the **whole** Linked List
    - Inner loop iterates until it **finds** a new `curr` node that doesn’t **contain** the **same** `val` with `keep` node
- There are **two** possible endings.
    1. Last node is **NOT** a **duplicate**:
        1. `curr` hits the end of the Linked List **inside** of the **outer** loop
    2. Last node **is** a **duplicate**:
        1. `curr` hits the end of the Linked List **inside** of the **nested** loop
        2. We need to **add** an `if` statement in both **outer** and **inner** loops to check if `curr` has hit the end of the Linked List
        3. We can **ignore** `curr` and make `keep` from **last** iteration as the end of the new Linked List
- The time complexity of this **solution** is **O(1)** in **best-case** and **O(n)** in **base-case & worst-case**

**Let’s see in code:**

```jsx
class Solution {
	  public ListNode deleteDuplicates(ListNode head) {

        if (head == null || head.next == null) return head;

        ListNode keep = head, curr = head.next;
				
				// iterates the whole Linked List
        while (curr != null) {

						// inner loop only iterates the duplicate nodes
            while (keep.val == curr.val) {

								// updates curr every time until it encounters
								// a node contains different value of null
                curr = curr.next;

								// if curr encounters null, break out of loop
                if (curr == null) break;
            }

						// if curr encounters null from inner loop,
						// this if statement gets triggers
            if (curr == null) {

								// ignore the rest of nodes from inner loop since
								// there are duplicates, we just need one node that
								// contains an unique value
                keep.next = null;
                break;
            };

						// by updating keep.next to curr, it removes the duplicates
						// or move to next node if the node doesn't have duplicates
            keep.next = curr;

						// reassign keep with curr to go through the rest
            keep = curr;
						
						// update curr to the next node of keep so that keep.val
						// and curr.val can be compared in the next iteration
            curr = curr.next;
        }

				// returns the head of the Linked List
        return head;
    }
}
```
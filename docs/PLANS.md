# Plans

Use lightweight ephemeral plans for small, local work. Check complex work into `exec-plans/active/`; move it to `completed/` when its acceptance criteria pass.

Every checked-in plan contains:

- outcome and acceptance criteria;
- progress log;
- decision log with alternatives;
- implementation slices;
- validation evidence;
- risks, escalation points, and deferred work.

Generation policy: All implementation is agent-authored; the owner is not expected to write code.

## Review and repair loop

- Validate current state
- Implement the smallest coherent change
- Run authoritative checks
- Self-review for correctness and scope
- Request owner judgment only for subjective or production-sensitive decisions
- Repair and repeat

## Automatic repair

- Formatting and lint failures
- Type and test failures
- Broken builds
- Architecture-check failures
- Accessibility defects that do not alter product intent

## Merge policy

Short-lived changes with local checks; add stronger gates only when risk or collaboration requires them.

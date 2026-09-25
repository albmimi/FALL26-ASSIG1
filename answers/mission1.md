# Mission 1: Python habits that break JavaScript security

## Evidence

Output of `npm run test:m1`, pasted or as a screenshot in `img/`:

```
normalizeService()
  PASS  valid entry is normalized and the name is trimmed
  PASS  returns a NEW object, not the same reference
  PASS  extra fields such as isAdmin are dropped
  PASS  null is rejected
  PASS  an array is rejected
  PASS  a string is rejected
  PASS  blank name is rejected
  PASS  name longer than 64 chars is rejected
  PASS  name that is not a string is rejected
  PASS  status 'UP' is rejected (case matters)
  PASS  unknown status is rejected
  PASS  online: "false" (string) is rejected
  PASS  online: 0 is rejected
  PASS  online: false (boolean) is accepted
  PASS  latencyMs: "120" (string) is rejected
  PASS  negative latency is rejected
  PASS  Infinity latency is rejected
  PASS  latencyMs: 0 is accepted (0 is falsy but valid!)
  PASS  missing latencyMs is rejected

parseStatusReport()
  PASS  invalid JSON fails safe
  PASS  missing services array fails safe
  PASS  services that is not an array fails safe
  PASS  JSON null fails safe
  PASS  mixed report keeps valid entries and counts rejected ones

24 passed, 0 failed
```

## Connections: Python to JavaScript

For each check you implemented, write how you would do it in Python and how you did it in JavaScript.

| Rule | Python | JavaScript, as in my code |
|---|---|---|
| raw is a dictionary or object, not a list | `isinstance(raw, dict)` | |
| name is a non-empty string after trimming | | |
| status is one of the allowed values | | |
| online is a real boolean | | |
| latencyMs is a finite number ≥ 0 | | |
| invalid JSON does not crash the program | | |

## Questions

1. Why is `latencyMs: 0` a trap for code such as `if (!raw.latencyMs) return null;`?

   > latencyMs: 0 is a valid value but JavaScript treats 0 as falsy. This means if (!raw.latencyMs) would incorrectly reject a latency of 0 even tho it should be allowed.

2. Your function builds a **new** object and ignores fields like `isAdmin`. Describe in two or three sentences what could go wrong later in an application that copied **every** field it received.

   > If theapplication copied every field it recived, someone could add an extra filed like isAdmin that the application wasnt expecting. If that field is used later without being checked it could affect what the user is allowed to do and create a secuirty problem.

## Documentation log

| Page I used, with URL | One thing I learned from it |
|---|---|
| | |

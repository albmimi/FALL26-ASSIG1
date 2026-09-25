# Mission 4: Report it and brief the owner

## Commit history

Output of `git log --oneline`:

```
d3b85f6 final m3
04d3b75 evid m3
f276f50 q1-3 m3
ccec8f3 defender m2
c418bda creative m2
d915de3 q1-3 m2
21e2f8e added all 3 screenshots to evidince
1adb1fc code passed m2
b048aff q2 m1
531c1a7 q1 m1
9f8a395 evidence m1
5538251 code passed m1
0ec161f nohing
2fa8a2a q3 m0
b37e3b2 q2 m0
1e8656e question 1 m0
4969a77 Ignore node_modules directory
d890ff1 first push with the assignment files
294714d Initial commit

```

Pick your **best** commit message and your **worst** one. Which of the 7 rules does the worst one break?

> My best commit message is 4969a77 Ignore node_modules directory because it clearly explains what change was made. My worst commit message is 0ec161f nohing because it is vague and does not explain what changed. It breaks the rule that commit messages should be clear and descriptive. 


## Pull Request

PR link, inside your fork:

> https://github.com/albmimi/FALL26-ASSIG1/pull/1 

## Creating value: the risk brief

The Operations Manager who owns the portal is not a developer. Write a brief of **120 to 180 words** addressed to them. It must answer:

1. What you proved, in terms of **impact** on operators and on the campus, not in terms of code.
2. Why "it uses HTTPS and validates its data" did **not** protect them.
3. The single most important change the backend team must make, stated concretely.
4. One honest limit of your engagement: what you did **not** test.

> To the Operations Manager: During this assessment, I showed that someone who can run code in the portal could interfere with what operators see and do. I was able to make an important button unusable and make unhealthy or unavailable services appear healthy. This could cause operators to miss a real outage or delay their response, affecting campus services that depend on accurate information. HTTPS did not prevent this because it protects data while it travels across the network, not after code is already running in the browser. Data validation also did not stop the attack because the data was changed into valid-looking information before the portal processed it. The most important change is for the backend to verify authorization and enforce sensitive actions on the server instead of trusting the browser. One limit of my assessment is that I did not test how an attacker would initially get malicious code into the portal or perform a full security assessment of the backend. 


## Reflection

In one or two sentences: which concept from Units 1.1 to 1.3 do you understand much better now, and what made it click?

> I understand client-side security much better now. Mission 3 made it click for me because I saw how easily code in the browser could be changed to make the portal show false information. 



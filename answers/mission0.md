# Mission 0: Get the code, the professional way

**Name:** Mayan Al Bakhat 
**GitHub username:** albmimi

## Evidence

### `git remote -v`
```
origin  https://github.com/albmimi/FALL26-ASSIG1.git (fetch)
origin  https://github.com/albmimi/FALL26-ASSIG1.git (push) 
```

### `git branch`
```
* assignment1
  main
```

### `git status` before the `.gitignore` fix
```
On branch assignment1
Untracked files:
  (use "git add <file>..." to include in what will be committed)
        node_modules/
        package-lock.json

nothing added to commit but untracked files present (use "git add" to track) 
```

### `git status` after the `.gitignore` fix
```
On branch assignment1
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   .gitignore

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        package-lock.json

no changes added to commit (use "git add" and/or "git commit -a")
```

## Questions

1. Which folder should not be committed, and why? Give one practical reason and one security-related reason.

   > node_modules/ should not be commited. A practical reason is that it can be very large and we can get again by running npm install. A security reason is, it cntains third party outside packages an code that our project uses so we dont need to put all of that code directly into our repository. 

2. What line or lines did you add to `.gitignore`? What does a trailing `/` mean in a `.gitignore` pattern?

   > I added node_modules/ to the .gitignore file. The / at the end means that node_modules is a folder, so Git will ignore that folder and the files inside it. 

3. **Connections:** in one or two sentences, what is the difference between a **fork** and a **clone**? Which one lives on GitHub and which one lives on your machine?

   > your answer

## Documentation log

| Page I used, with URL | One thing I learned from it |
|---|---|
| | |

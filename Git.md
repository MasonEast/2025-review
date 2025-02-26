# Git

## 日常开发常用 Git 命令

### 分支管理

```bash
git branch # 查看本地分支
git branch -r # 查看远程分支
git branch -a # 查看所有分支
git branch -d branch_name # 删除本地分支
git branch -D branch_name # 强制删除本地分支
git branch -m old_branch_name new_branch_name # 重命名本地分支
git branch -M old_branch_name new_branch_name # 强制重命名本地分支
git branch -u remote_branch_name # 设置本地分支跟踪远程分支
git branch -d -r remote_branch_name # 删除远程分支
git branch -D -r remote_branch_name # 强制删除远程分支

git checkout branch_name # 切换分支
git checkout -b branch_name # 创建并切换分支
git checkout -B branch_name # 强制创建并切换分支
git checkout --track remote_branch_name # 创建并切换分支，并设置本地分支跟踪远程分支
git checkout --detach branch_name # 切换分支并分离 HEAD
```

### 提交管理

```bash
git pull # 拉取远程分支最新代码

git add . # 添加所有文件到暂存区
git add file_name # 添加指定文件到暂存区
git add -A # 添加所有文件到暂存区
git add -u # 添加已跟踪文件到暂存区
git add -p # 添加已修改文件到暂存区

git stash # 暂存当前工作区
git stash pop # 恢复暂存的工作区
git stash list # 查看暂存的工作区列表
git stash apply stash@{n} # 恢复指定的暂存的工作区
git stash drop stash@{n} # 删除指定的暂存的工作区

git commit -m 'commit message' # 提交代码
git commit --amend # 修改最近一次提交
git commit --amend -m 'new commit message' # 修改最近一次提交的提交信息
git commit --amend --no-edit # 修改最近一次提交但不修改提交信息
git commit --amend --no-verify # 修改最近一次提交但不进行钩子验证
git commit --amend --reset-author # 修改最近一次提交的作者信息

git push # 推送代码
git push origin branch_name # 推送代码到远程分支
git push origin branch_name:remote_branch_name # 推送代码到远程分支
git push origin :remote_branch_name # 删除远程分支
git push origin --delete remote_branch_name # 删除远程分支
git push origin --tags # 推送标签

git reset --soft HEAD~1 # 回退到上一个提交，保留修改
git reset --mixed HEAD~1 # 回退到上一个提交，保留修改，删除暂存区
git reset --hard HEAD~1 # 回退到上一个提交，删除修改，删除暂存区
git reset --soft HEAD~1 # 回退到上一个提交，保留修改，删除暂存区
git reset --hard HEAD~1 # 回退到上一个提交，删除修改，删除暂存区
git reset --soft HEAD~1 # 回退到上一个提交，保留修改，删除暂存区

git revert HEAD~1 # 撤销最近一次提交
git revert HEAD~1 -m 1 # 撤销最近一次提交，保留修改
git revert HEAD~1 -m 2 # 撤销最近一次提交，删除修改
git revert HEAD~1 -m 3 # 撤销最近一次提交，保留修改，删除暂存区

git remote -v # 查看远程仓库

git tag # 查看标签
git tag -a v1.0 -m 'version 1.0' # 添加标签
git tag -d v1.0 # 删除标签
git push origin v1.0 # 推送标签
git push origin --tags # 推送所有标签
```

### 合并与变基

```bash
git merge branch_name # 合并分支
git rebase branch_name # 变基分支
git rebase --abort # 放弃变基
git rebase --continue # 继续变基
git rebase --skip # 跳过变基
git rebase -i HEAD~n # 交互式变基
git rebase -i HEAD~n commit_id # 交互式变基
git rebase -i HEAD~n commit_id^ # 交互式变基
```

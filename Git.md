# Git 面试题

## Git 基础概念

### 1. 什么是 Git

Git 是一个分布式版本控制系统，由 Linus Torvalds 创建，用于管理代码版本和协作开发。

**核心特点：**
- 分布式：每个开发者都有完整的代码仓库
- 快速：大部分操作在本地完成
- 数据完整性：使用 SHA-1 哈希保证数据完整性
- 分支管理：轻量级的分支和合并
- 开源免费

**优势：**
- 离线工作：大部分操作不需要网络
- 分支切换快速
- 强大的合并能力
- 历史记录完整
- 灵活的工作流程

### 2. Git vs SVN

| 特性     | Git    | SVN    |
| -------- | ------ | ------ |
| 架构     | 分布式 | 集中式 |
| 存储方式 | 快照   | 差异   |
| 分支     | 轻量级 | 重量级 |
| 性能     | 快速   | 较慢   |
| 离线工作 | ✅      | ❌      |
| 学习曲线 | 陡峭   | 平缓   |

### 3. Git 的三个区域

```
工作区（Working Directory）
  ↓ git add
暂存区（Staging Area/Index）
  ↓ git commit
本地仓库（Local Repository）
  ↓ git push
远程仓库（Remote Repository）
```

**工作区：**
- 实际的文件目录
- 正在编辑的文件

**暂存区：**
- 临时存储待提交的修改
- `.git/index` 文件

**本地仓库：**
- `.git` 目录
- 存储所有提交历史

**远程仓库：**
- GitHub、GitLab、Gitee 等
- 团队协作的中心

### 4. Git 文件状态

```
未跟踪（Untracked）
  ↓ git add
已暂存（Staged）
  ↓ git commit
已提交（Committed）
  ↓ 修改文件
已修改（Modified）
  ↓ git add
已暂存（Staged）
```

**未跟踪（Untracked）：**
- 新创建的文件
- Git 不知道它的存在

**已暂存（Staged）：**
- 已添加到暂存区
- 等待提交

**已提交（Committed）：**
- 已保存到本地仓库
- 有完整的历史记录

**已修改（Modified）：**
- 文件已修改但未暂存
- 工作区和暂存区不一致

## Git 基础命令

### 1. 配置 Git

```bash
# 查看配置
git config --list
git config --global --list
git config --local --list

# 设置用户信息
git config --global user.name "张三"
git config --global user.email "zhangsan@example.com"

# 设置默认编辑器
git config --global core.editor vim

# 设置别名
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'

# 设置换行符
git config --global core.autocrlf true  # Windows
git config --global core.autocrlf input # Mac/Linux

# 设置忽略文件权限变化
git config --global core.filemode false
```

### 2. 创建仓库

```bash
# 初始化本地仓库
git init

# 克隆远程仓库
git clone <url>
git clone <url> <directory>
git clone --depth 1 <url>  # 浅克隆（只克隆最近一次提交）
git clone -b <branch> <url> # 克隆指定分支
```

### 3. 查看状态

```bash
# 查看工作区状态
git status
git status -s  # 简短格式

# 查看修改内容
git diff              # 工作区 vs 暂存区
git diff --cached     # 暂存区 vs 本地仓库
git diff HEAD         # 工作区 vs 本地仓库
git diff <branch1> <branch2>  # 比较分支

# 查看文件历史
git log
git log --oneline     # 单行显示
git log --graph       # 图形化显示
git log --all         # 所有分支
git log -n 5          # 最近5次提交
git log --author="张三"
git log --since="2 weeks ago"
git log --until="2023-12-31"
git log --grep="fix"  # 搜索提交信息
git log -p            # 显示差异
git log --stat        # 显示统计信息

# 查看提交历史（更强大）
git reflog            # 查看所有操作历史
```

### 4. 添加和提交

```bash
# 添加到暂存区
git add <file>        # 添加指定文件
git add .             # 添加所有文件
git add -A            # 添加所有文件（包括删除的）
git add -u            # 添加已跟踪的文件
git add -p            # 交互式添加

# 提交
git commit -m "提交信息"
git commit -am "提交信息"  # 自动添加已跟踪文件并提交
git commit --amend         # 修改最近一次提交
git commit --amend -m "新的提交信息"
git commit --amend --no-edit  # 修改提交但不修改信息

# 提交规范（Conventional Commits）
git commit -m "feat: 添加用户登录功能"
git commit -m "fix: 修复登录bug"
git commit -m "docs: 更新README文档"
git commit -m "style: 格式化代码"
git commit -m "refactor: 重构用户模块"
git commit -m "test: 添加单元测试"
git commit -m "chore: 更新依赖"
```

### 5. 撤销和恢复

```bash
# 撤销工作区的修改
git checkout -- <file>
git restore <file>    # Git 2.23+

# 撤销暂存区的修改（保留工作区）
git reset HEAD <file>
git restore --staged <file>  # Git 2.23+

# 撤销提交
git reset --soft HEAD~1   # 保留修改和暂存区
git reset --mixed HEAD~1  # 保留修改，清空暂存区（默认）
git reset --hard HEAD~1   # 删除修改和暂存区

# 回退到指定提交
git reset --hard <commit-id>

# 撤销某次提交（创建新提交）
git revert <commit-id>
git revert HEAD           # 撤销最近一次提交
git revert HEAD~3..HEAD   # 撤销最近3次提交

# 恢复删除的文件
git checkout <commit-id> -- <file>

# 恢复删除的提交
git reflog
git reset --hard <commit-id>
```

### 6. 删除文件

```bash
# 删除文件
git rm <file>             # 删除文件并从暂存区移除
git rm --cached <file>    # 只从暂存区移除，保留工作区
git rm -r <directory>     # 删除目录
git rm -f <file>          # 强制删除
```

## 分支管理

### 1. 分支基础

```bash
# 查看分支
git branch              # 查看本地分支
git branch -r           # 查看远程分支
git branch -a           # 查看所有分支
git branch -v           # 查看分支及最后一次提交
git branch -vv          # 查看分支及跟踪关系

# 创建分支
git branch <branch>
git checkout -b <branch>       # 创建并切换
git switch -c <branch>         # Git 2.23+

# 切换分支
git checkout <branch>
git switch <branch>            # Git 2.23+

# 重命名分支
git branch -m <old> <new>
git branch -M <old> <new>      # 强制重命名

# 删除分支
git branch -d <branch>         # 删除已合并的分支
git branch -D <branch>         # 强制删除

# 删除远程分支
git push origin --delete <branch>
git push origin :<branch>
```

### 2. 合并分支

```bash
# 合并分支
git merge <branch>
git merge --no-ff <branch>     # 禁用快进合并
git merge --squash <branch>    # 压缩合并

# 合并策略
git merge -s recursive <branch>   # 递归策略（默认）
git merge -s ours <branch>        # 使用当前分支
git merge -s theirs <branch>      # 使用目标分支
```

**合并类型：**

**快进合并（Fast-forward）：**
```
main:     A---B---C
                   \
feature:            D---E

合并后:
main:     A---B---C---D---E
```

**非快进合并（No Fast-forward）：**
```
main:     A---B---C-------F
                   \     /
feature:            D---E

合并后创建新提交 F
```

**压缩合并（Squash）：**
```
main:     A---B---C---D
                   \
feature:            E---F---G

合并后:
main:     A---B---C---D---H
（H 包含 E、F、G 的所有修改）
```

### 3. 变基（Rebase）

```bash
# 变基
git rebase <branch>
git rebase --continue      # 解决冲突后继续
git rebase --abort         # 放弃变基
git rebase --skip          # 跳过当前提交

# 交互式变基
git rebase -i HEAD~3       # 变基最近3次提交
git rebase -i <commit-id>

# 变基到某个分支
git rebase main
git rebase main feature
```

**交互式变基操作：**
```
pick：保留提交
reword：修改提交信息
edit：修改提交内容
squash：合并到前一个提交
fixup：合并到前一个提交，丢弃提交信息
drop：删除提交
```

**Merge vs Rebase：**

| 特性     | Merge        | Rebase       |
| -------- | ------------ | ------------ |
| 历史记录 | 保留分支历史 | 线性历史     |
| 提交图   | 复杂         | 简洁         |
| 冲突处理 | 一次性       | 可能多次     |
| 安全性   | 安全         | 需谨慎       |
| 使用场景 | 合并主分支   | 整理本地提交 |

**建议：**
- 本地分支使用 rebase
- 公共分支使用 merge
- 不要 rebase 已推送的提交

### 4. 解决冲突

```bash
# 查看冲突文件
git status

# 冲突标记
<<<<<<< HEAD
当前分支的内容
=======
要合并的分支的内容
>>>>>>> branch-name

# 解决冲突后
git add <file>
git commit  # merge 冲突
git rebase --continue  # rebase 冲突

# 使用工具解决冲突
git mergetool

# 终止合并或变基
git merge --abort
git rebase --abort
```

## 远程仓库

### 1. 远程仓库管理

```bash
# 查看远程仓库
git remote
git remote -v
git remote show origin

# 添加远程仓库
git remote add origin <url>
git remote add upstream <url>  # 上游仓库

# 修改远程仓库
git remote rename origin new-origin
git remote set-url origin <new-url>

# 删除远程仓库
git remote remove origin
```

### 2. 拉取和推送

```bash
# 拉取
git fetch                  # 拉取所有远程分支
git fetch origin           # 拉取指定远程仓库
git fetch origin main      # 拉取指定分支

# 拉取并合并
git pull                   # = git fetch + git merge
git pull --rebase          # = git fetch + git rebase
git pull origin main

# 推送
git push                   # 推送当前分支
git push origin main       # 推送到指定分支
git push -u origin main    # 推送并设置上游分支
git push --all             # 推送所有分支
git push --force           # 强制推送（慎用）
git push --force-with-lease  # 更安全的强制推送

# 推送标签
git push origin <tag>
git push origin --tags     # 推送所有标签

# 删除远程分支
git push origin --delete <branch>
git push origin :<branch>
```

### 3. 跟踪分支

```bash
# 查看跟踪关系
git branch -vv

# 设置跟踪分支
git branch -u origin/main
git branch --set-upstream-to=origin/main

# 创建跟踪分支
git checkout -b local-branch origin/remote-branch
git checkout --track origin/remote-branch
```

## 标签管理

### 1. 标签基础

```bash
# 查看标签
git tag
git tag -l "v1.*"          # 筛选标签

# 创建轻量标签
git tag v1.0

# 创建附注标签（推荐）
git tag -a v1.0 -m "版本 1.0"
git tag -a v1.0 <commit-id> -m "版本 1.0"

# 查看标签信息
git show v1.0

# 删除标签
git tag -d v1.0

# 删除远程标签
git push origin --delete v1.0
git push origin :refs/tags/v1.0
```

### 2. 推送和拉取标签

```bash
# 推送标签
git push origin v1.0
git push origin --tags     # 推送所有标签

# 拉取标签
git fetch origin --tags

# 检出标签
git checkout v1.0          # 分离 HEAD 状态
git checkout -b branch-name v1.0  # 基于标签创建分支
```

## 暂存（Stash）

### 1. 暂存修改

```bash
# 暂存当前修改
git stash
git stash save "描述信息"

# 暂存包括未跟踪的文件
git stash -u
git stash --include-untracked

# 暂存所有文件（包括忽略的）
git stash -a
git stash --all
```

### 2. 查看和应用暂存

```bash
# 查看暂存列表
git stash list

# 查看暂存内容
git stash show
git stash show -p          # 显示详细差异
git stash show stash@{0}

# 应用暂存
git stash apply            # 应用最近的暂存
git stash apply stash@{0}  # 应用指定的暂存
git stash pop              # 应用并删除最近的暂存
git stash pop stash@{0}

# 删除暂存
git stash drop stash@{0}
git stash clear            # 删除所有暂存
```

### 3. 从暂存创建分支

```bash
git stash branch <branch-name>
git stash branch <branch-name> stash@{0}
```

## Git 工作流

### 1. Git Flow

最经典的工作流程，适合有明确发布周期的项目。

**分支类型：**
- `main/master`：主分支，生产环境代码
- `develop`：开发分支，集成分支
- `feature/*`：功能分支
- `release/*`：发布分支
- `hotfix/*`：热修复分支

**流程：**
```bash
# 初始化
git flow init

# 功能开发
git flow feature start login
git flow feature finish login

# 发布版本
git flow release start 1.0.0
git flow release finish 1.0.0

# 热修复
git flow hotfix start fix-bug
git flow hotfix finish fix-bug
```

**示意图：**
```
main:     -----A---------E---------H
               \        /         /
release:        \------D         /
                 \              /
develop:    ------B-----C------F------G
                   \   /        \    /
feature:            C-C          G--G
                   /              \
hotfix:                            H
```

### 2. GitHub Flow

简化的工作流程，适合持续部署的项目。

**特点：**
- 只有 `main` 分支和功能分支
- main 分支始终可部署
- 通过 Pull Request 进行代码审查

**流程：**
```bash
# 1. 创建分支
git checkout -b feature/login

# 2. 开发并提交
git add .
git commit -m "feat: add login"

# 3. 推送到远程
git push origin feature/login

# 4. 创建 Pull Request

# 5. 代码审查

# 6. 合并到 main

# 7. 部署
```

### 3. GitLab Flow

介于 Git Flow 和 GitHub Flow 之间。

**特点：**
- 环境分支：`production`、`pre-production`、`main`
- 功能分支合并到 `main`
- `main` 合并到 `pre-production`
- `pre-production` 合并到 `production`

### 4. Trunk-Based Development

基于主干的开发，适合高频发布。

**特点：**
- 只有 `main` 分支
- 短生命周期的功能分支
- 频繁集成
- 功能开关（Feature Toggle）

## Git 高级技巧

### 1. Cherry-pick

挑选某个提交应用到当前分支。

```bash
# 应用单个提交
git cherry-pick <commit-id>

# 应用多个提交
git cherry-pick <commit-id1> <commit-id2>

# 应用提交范围
git cherry-pick <commit-id1>..<commit-id2>

# 只应用修改，不提交
git cherry-pick -n <commit-id>

# 解决冲突后继续
git cherry-pick --continue

# 放弃
git cherry-pick --abort
```

### 2. 修改历史提交

```bash
# 修改最近一次提交
git commit --amend

# 修改最近3次提交
git rebase -i HEAD~3

# 修改某个提交
git rebase -i <commit-id>^

# 操作：
# pick → edit（修改提交）
# 修改文件后
git add .
git commit --amend
git rebase --continue
```

### 3. 子模块（Submodule）

```bash
# 添加子模块
git submodule add <url> <path>

# 克隆包含子模块的仓库
git clone --recursive <url>
git clone <url>
git submodule init
git submodule update

# 更新子模块
git submodule update --remote
git submodule update --remote --merge

# 删除子模块
git submodule deinit <path>
git rm <path>
rm -rf .git/modules/<path>
```

### 4. 子树（Subtree）

```bash
# 添加子树
git subtree add --prefix=<directory> <url> <branch>

# 拉取子树更新
git subtree pull --prefix=<directory> <url> <branch>

# 推送子树修改
git subtree push --prefix=<directory> <url> <branch>
```

### 5. Worktree

在多个目录中同时处理不同分支。

```bash
# 添加工作树
git worktree add <path> <branch>

# 查看工作树
git worktree list

# 删除工作树
git worktree remove <path>
git worktree prune
```

### 6. Bisect（二分查找）

快速定位引入 bug 的提交。

```bash
# 开始二分查找
git bisect start

# 标记当前版本有问题
git bisect bad

# 标记某个版本正常
git bisect good <commit-id>

# Git 会自动检出中间的提交
# 测试后标记
git bisect good  # 正常
git bisect bad   # 有问题

# 找到问题提交后
git bisect reset
```

### 7. Blame（追踪代码）

查看每一行代码的最后修改者。

```bash
# 查看文件的修改历史
git blame <file>

# 查看指定行范围
git blame -L 10,20 <file>

# 忽略空白变化
git blame -w <file>

# 显示邮箱
git blame -e <file>
```

### 8. Reflog（恢复丢失的提交）

```bash
# 查看所有操作历史
git reflog

# 恢复到某个状态
git reset --hard HEAD@{2}
git checkout HEAD@{2}
```

## .gitignore 文件

### 1. 基本语法

```gitignore
# 注释

# 忽略所有 .a 文件
*.a

# 但跟踪 lib.a
!lib.a

# 只忽略当前目录下的 TODO 文件
/TODO

# 忽略 build/ 目录下的所有文件
build/

# 忽略 doc 目录下的所有 .txt 文件
doc/**/*.txt

# 忽略 doc/ 目录下的所有 .pdf 文件，但不包括子目录
doc/*.pdf
```

### 2. 常见模板

**Node.js：**
```gitignore
node_modules/
npm-debug.log
.env
dist/
build/
.cache/
```

**Python：**
```gitignore
__pycache__/
*.py[cod]
venv/
.env
*.egg-info/
dist/
build/
```

**前端项目：**
```gitignore
node_modules/
dist/
build/
.cache/
.DS_Store
.env.local
.env.*.local
npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

### 3. 全局 .gitignore

```bash
# 创建全局 .gitignore
git config --global core.excludesfile ~/.gitignore_global

# 编辑文件
vim ~/.gitignore_global

# 添加内容
.DS_Store
.idea/
*.swp
*~
```

### 4. 忽略已跟踪的文件

```bash
# 停止跟踪但保留文件
git rm --cached <file>

# 停止跟踪整个目录
git rm -r --cached <directory>

# 添加到 .gitignore
echo "<file>" >> .gitignore
git add .gitignore
git commit -m "chore: update .gitignore"
```

## Git Hooks

### 1. 客户端钩子

**pre-commit：**
提交前执行，用于代码检查。

```bash
#!/bin/sh
# .git/hooks/pre-commit

# ESLint 检查
npm run lint

# 测试
npm test
```

**prepare-commit-msg：**
准备提交信息。

**commit-msg：**
验证提交信息。

```bash
#!/bin/sh
# .git/hooks/commit-msg

commit_msg_file=$1
commit_msg=$(cat "$commit_msg_file")

# 验证提交信息格式
if ! echo "$commit_msg" | grep -qE "^(feat|fix|docs|style|refactor|test|chore):.+$"; then
  echo "Error: Commit message must follow format: type: description"
  exit 1
fi
```

**post-commit：**
提交后执行。

**pre-push：**
推送前执行。

### 2. 服务端钩子

**pre-receive：**
接收推送前执行。

**update：**
更新分支前执行。

**post-receive：**
接收推送后执行，常用于部署。

### 3. Husky 使用

```bash
# 安装
npm install --save-dev husky

# 初始化
npx husky install

# 添加钩子
npx husky add .husky/pre-commit "npm test"
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```

## 常见面试题

### 1. Git 和 SVN 的区别？

**Git（分布式）：**
- 每个开发者都有完整的代码仓库
- 大部分操作在本地完成，速度快
- 分支轻量级，创建和切换快速
- 可以离线工作

**SVN（集中式）：**
- 只有一个中央仓库
- 大部分操作需要连接服务器
- 分支是目录复制，较重
- 需要网络连接

### 2. Git 的工作流程是什么？

```
1. 工作区修改文件
2. git add 添加到暂存区
3. git commit 提交到本地仓库
4. git push 推送到远程仓库
```

### 3. Git fetch 和 git pull 的区别？

**git fetch：**
- 只拉取远程仓库的更新
- 不会自动合并
- 更安全

**git pull：**
- = git fetch + git merge
- 自动合并到当前分支
- 可能产生冲突

**建议：**
使用 `git fetch` + `git merge` 更安全，可以先查看更新内容。

### 4. Git merge 和 git rebase 的区别？

**git merge：**
- 保留完整的历史记录
- 创建合并提交
- 历史记录可能复杂
- 适合合并公共分支

**git rebase：**
- 重写提交历史
- 线性历史记录
- 历史记录简洁
- 适合整理本地提交

**示例：**
```bash
# merge
A---B---C---D  (main)
     \       \
      E---F---G (feature)

# rebase
A---B---C---D---E'---F'---G' (feature)
```

**注意：**
不要 rebase 已经推送到公共仓库的提交！

### 5. Git reset、git revert 和 git checkout 的区别？

**git reset：**
- 移动 HEAD 指针
- 可以修改历史
- 三种模式：soft、mixed、hard
- 适合本地撤销

```bash
git reset --soft HEAD~1   # 保留修改和暂存区
git reset --mixed HEAD~1  # 保留修改，清空暂存区
git reset --hard HEAD~1   # 删除所有修改
```

**git revert：**
- 创建新的提交来撤销
- 不修改历史
- 适合撤销已推送的提交

```bash
git revert <commit-id>
```

**git checkout：**
- 切换分支或恢复文件
- 不修改提交历史

```bash
git checkout <branch>     # 切换分支
git checkout -- <file>    # 恢复文件
```

### 6. 如何解决 Git 冲突？

**步骤：**
1. 拉取最新代码发现冲突
2. 打开冲突文件，找到冲突标记
3. 手动解决冲突
4. 添加到暂存区：`git add`
5. 提交：`git commit`

**冲突标记：**
```
<<<<<<< HEAD
当前分支的代码
=======
要合并的分支的代码
>>>>>>> branch-name
```

**工具：**
- VSCode 内置冲突解决
- GitKraken
- SourceTree
- `git mergetool`

### 7. 如何撤销已经 push 的提交？

**方法一：git revert（推荐）**
```bash
git revert <commit-id>
git push
```

**方法二：git reset + force push（慎用）**
```bash
git reset --hard <commit-id>
git push --force
```

**注意：**
- 公共分支不要使用 `git push --force`
- 会影响其他开发者
- 使用 `git push --force-with-lease` 更安全

### 8. Git 分支命名规范是什么？

**常见规范：**
- `feature/功能名称`：新功能
- `bugfix/bug名称`：bug 修复
- `hotfix/紧急修复`：紧急修复
- `release/版本号`：发布分支
- `test/测试名称`：测试分支

**示例：**
```
feature/user-login
bugfix/fix-login-error
hotfix/fix-critical-bug
release/v1.2.0
```

### 9. 如何查看某个文件的修改历史？

```bash
# 查看文件的提交历史
git log <file>
git log -p <file>          # 显示差异

# 查看文件的每一行的修改者
git blame <file>

# 查看文件在某个提交时的内容
git show <commit-id>:<file>

# 查看文件的所有版本
git log --all --full-history -- <file>
```

### 10. 如何修改已经提交的 commit 信息？

**修改最近一次提交：**
```bash
git commit --amend -m "新的提交信息"
```

**修改更早的提交：**
```bash
# 交互式 rebase
git rebase -i HEAD~3

# 将要修改的提交前的 pick 改为 reword
# 保存后会逐个修改提交信息
```

### 11. 什么是 Git stash？如何使用？

Git stash 用于暂时保存工作区的修改。

**使用场景：**
- 切换分支但不想提交
- 临时处理其他任务
- 保存未完成的工作

**常用命令：**
```bash
git stash                  # 暂存
git stash list             # 查看列表
git stash pop              # 应用并删除
git stash apply            # 应用但不删除
git stash drop             # 删除
git stash clear            # 清空所有
```

### 12. 如何删除远程分支？

```bash
# 方法一
git push origin --delete <branch>

# 方法二
git push origin :<branch>

# 删除本地分支
git branch -d <branch>
git branch -D <branch>  # 强制删除
```

### 13. Git tag 的作用是什么？

Git tag 用于标记特定的提交点，通常用于版本发布。

**类型：**
- 轻量标签：只是一个提交的引用
- 附注标签：包含完整信息（推荐）

**使用：**
```bash
# 创建标签
git tag v1.0.0
git tag -a v1.0.0 -m "版本 1.0.0"

# 推送标签
git push origin v1.0.0
git push origin --tags

# 删除标签
git tag -d v1.0.0
git push origin --delete v1.0.0
```

### 14. 如何优化 Git 仓库的大小？

**方法：**
1. 清理历史大文件
2. 使用 Git LFS 管理大文件
3. 浅克隆
4. 垃圾回收

```bash
# 查找大文件
git rev-list --objects --all | \
  git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' | \
  awk '/^blob/ {print substr($0,6)}' | \
  sort --numeric-sort --key=2 | \
  tail -n 10

# 删除大文件历史
git filter-branch --tree-filter 'rm -f path/to/large/file' HEAD

# 垃圾回收
git gc --aggressive --prune=now

# 推送
git push origin --force --all
```

### 15. Git 的最佳实践有哪些？

**提交相关：**
- 频繁提交，小步前进
- 写清晰的提交信息
- 遵循提交规范（Conventional Commits）
- 一个提交只做一件事

**分支相关：**
- 使用分支进行开发
- 及时合并主分支
- 删除已合并的分支
- 遵循分支命名规范

**协作相关：**
- 推送前先拉取
- 不要提交敏感信息
- 使用 .gitignore
- 代码审查（Pull Request）

**其他：**
- 定期清理本地分支
- 使用 Git Hooks
- 备份重要分支
- 学习 Git 原理

## 最佳实践

### 1. 提交信息规范

**Conventional Commits 格式：**
```
<type>(<scope>): <subject>

<body>

<footer>
```

**type 类型：**
- `feat`：新功能
- `fix`：修复 bug
- `docs`：文档修改
- `style`：格式化代码
- `refactor`：重构代码
- `test`：添加测试
- `chore`：构建过程或辅助工具的变动

**示例：**
```
feat(user): add user login function

- Add login API
- Add login form validation
- Add login error handling

Closes #123
```

### 2. 分支策略

- ✅ 主分支保护（不直接推送）
- ✅ 功能分支开发
- ✅ 代码审查后合并
- ✅ 及时删除已合并分支
- ✅ 定期同步主分支

### 3. 代码审查

- ✅ 使用 Pull Request
- ✅ 至少一人审查
- ✅ 自动化测试通过
- ✅ 解决所有评论
- ✅ 及时合并

### 4. 安全实践

- ✅ 不提交敏感信息（密码、密钥）
- ✅ 使用 .gitignore
- ✅ 使用环境变量
- ✅ 定期审查提交历史
- ✅ 使用 Git Hooks 检查

### 5. 团队协作

- ✅ 统一工作流程
- ✅ 规范提交信息
- ✅ 及时沟通
- ✅ 文档完善
- ✅ 知识分享

## 总结

Git 是现代软件开发必备的版本控制工具，掌握 Git 需要：

1. **理解核心概念**：工作区、暂存区、本地仓库、远程仓库
2. **掌握基础命令**：add、commit、push、pull、merge
3. **熟悉分支管理**：创建、切换、合并、删除分支
4. **了解工作流程**：Git Flow、GitHub Flow 等
5. **掌握高级技巧**：rebase、cherry-pick、stash、hooks
6. **遵循最佳实践**：提交规范、分支策略、代码审查

持续学习，在实践中提升 Git 技能！

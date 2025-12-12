# 基本設定
export LANG=ja_JP.UTF-8
export EDITOR='vim'

# 色を使用
autoload -Uz colors
colors

# PATHの設定
export PATH=/usr/local/bin:$PATH
export PATH=/usr/local/sbin:$PATH

# m1 brew path
export PATH="$PATH:/opt/homebrew/bin"

# 起動時にnode 読み込みを実行
export PATH=$HOME/.nodebrew/current/bin:$PATH

# Python のpath設定
export PATH=/opt/homebrew/opt/python3/libexec/bin:$PATH

# aws-mfaの設定
export PATH=$PATH:$HOME/Library/Python/3.9/bin

# cluade code
export CLAUDE_CODE_USE_BEDROCK=1
export ANTHROPIC_MODEL="us.anthropic.claude-sonnet-4-20250514-v1:0"
export AWS_REGION="us-east-1" # AWSのリージョンを指定
# export AWS_PROFILE="bedrock-dev"　# 一時無効
export DISABLE_PROMPT_CACHING=0 # キャッシュを無効化する場合は1に設定

# postgresql
export PATH="/opt/homebrew/opt/postgresql@16/bin:$PATH"

# 真macでは様子見
# ryeの設定
# source "$HOME/.rye/env"

# volta
export VOLTA_HOME="$HOME/.volta"
export PATH="$VOLTA_HOME/bin:$PATH"

# nvm 設定をvoltaに変更したのでオフにしている
# export NVM_DIR="$HOME/.nvm"
# [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
# [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# autoload -U add-zsh-hook
# load-nvmrc() {
#   local nvmrc_path="$(nvm_find_nvmrc)"

#   if [ -n "$nvmrc_path" ]; then
#     local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")

#     if [ "$nvmrc_node_version" = "N/A" ]; then
#       nvm install
#     elif [ "$nvmrc_node_version" != "$(nvm version)" ]; then
#       nvm use
#     fi
#   elif [ -n "$(PWD=$OLDPWD nvm_find_nvmrc)" ] && [ "$(nvm version)" != "$(nvm version default)" ]; then
#     echo "Reverting to nvm default version"
#     nvm use default
#   fi
# }
# add-zsh-hook chpwd load-nvmrc
# load-nvmrc

# pyenv　→ 真macでは様子見
# export PATH="$HOME/.pyenv/bin:$PATH"
# eval "$(pyenv init --path)"
# eval "$(pyenv init -)"

# python-minのm1対応
# export PMIP_CBC_LIBRARY="/usr/local/lib/libCbc.dylib"
# export LD_LIBRARY_PATH="/home/haroldo/prog/lib/":$LD_LIBRARY_PATH

# rust → 真macでは様子見
# source $HOME/.cargo/env

# 新macでは様子見
# # Colima(docker for mac 死んでるので。。)
# if ! colima status >/dev/null 2>&1; then
#   colima start --cpu 6 --memory 12 --disk 80
# fi

# 各種設定 
source /opt/homebrew/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
setopt auto_cd # enabled to cd dir by dir-name
setopt auto_pushd
setopt pushd_ignore_dups
zstyle ":completion:*:commands" rehash 1 # install cmd, ready to use

# エイリアス設定
alias v=vim
alias g=git
alias k=kubectl
alias r=rails
alias a=aws
alias gc=gcloud
alias dc=docker-compose
alias dce='docker-compose exec'
alias ds=docker-sync
alias vg=vagrant
alias vgs='vagrant ssh'
alias ls='ls -AG'
alias la='ls -al'
alias ll='ls -l'
alias lf='ls -F'
alias del='rm -rf'
alias sed=gsed
alias de=develop
alias orde='origin develop'
alias m='make'
alias awsp='source ~/awsp/run.sh'

# tmux
alias tm='tmux -f ~/.config/tmux/.tmux.conf'
alias ide='~/.config/tmux/bin/ide.sh'

# atcoder 
alias otphp='oj t -c "php main.php" -d ./tests/ -N'

# tmux

# その他
alias tarc='tar -zcvf'
alias tarx='tar -zxvf'

# z コマンド 一旦コメントアウト
# . ~/z/z.sh

# 一般設定
setopt no_beep           # ビープ音を鳴らさないようにする
setopt auto_cd           # ディレクトリ名の入力のみで移動する
setopt auto_pushd        # cd時にディレクトリスタックにpushdする
setopt correct           # コマンドのスペルを訂正する
setopt magic_equal_subst # =以降も補完する(--prefix=/usrなど)
setopt prompt_subst      # プロンプト定義内で変数置換やコマンド置換を扱う
setopt notify            # バックグラウンドジョブの状態変化を即時報告する
setopt equals            # =commandを`which command`と同じ処理にする

# 補完機能
setopt auto_list               # 補完候補を一覧で表示する(d)
setopt auto_menu               # 補完キー連打で補完候補を順に表示する(d)
setopt list_packed             # 補完候補をできるだけ詰めて表示する
setopt list_types              # 補完候補にファイルの種類も表示する
zstyle ':completion:*' matcher-list 'm:{a-z}={A-Z}' # 補完時に大文字小文字を区別しない

# ログ設定
HISTFILE=~/.zsh_history   # ヒストリを保存するファイル
HISTSIZE=10000            # メモリに保存されるヒストリの件数
SAVEHIST=10000            # 保存されるヒストリの件数

# 各種関数
function gip() {
  curl inet-ip.info
}

function vs() {
  vim "$(find $1 -type f -iname \*$2\* 2>/dev/null | peco)"
}

function vsg() {
  str="$(grep -rn $1 $2 2>/dev/null | peco)"
  fileName="$(echo ${str} | sed -e 's/^\(.*\):[0-9]\{1,\}:.*$/\1/')"
  num="$(echo ${str} | sed -e 's/^\(.*\):\([0-9]\{1,\}\):.*$/\2/')"
  vim -c ${num} ${fileName}
}

function cds() {
  cd "$(find $1 -type d -iname \*$2\* 2>/dev/null | peco)"
}

function mds() {
  local fileName="$(find ~/memo -type f -iname \*$1\* 2>/dev/null | peco)"

  if [ ! -z "$fileName" ] ; then
    macdown "$fileName"
  fi
}

function peco-history-selection() {
    BUFFER=`\history -n 1 | tail -r  | awk '!a[$0]++' | peco`
    CURSOR=$#BUFFER
    zle reset-prompt
}  
zle -N peco-history-selection
bindkey '^T' peco-history-selection

# zsh-completion
# completion path
if type brew &>/dev/null; then
  FPATH="$(brew --prefix)/share/zsh/site-functions:$(brew --prefix)/share/zsh-completions:$FPATH"
fi
autoload -Uz compinit
compinit

# oh-my-zsh settings → 入れてないのでコメントアウト
# export ZSH="$HOME/.oh-my-zsh"
# ZSH_THEME="robbyrussell"
# plugins=(
#   git
#   zsh-autosuggestions
# )
# source $ZSH/oh-my-zsh.sh

# 環境依存系の読み込み
[ -f ~/.zshrc.local ] && source ~/.zshrc.local

# 文字列を標準入力としてシェルに与えて実行（した上でその返り値を取得）できる
eval $(thefuck --alias)
eval "$(starship init zsh)"

# source /Users/jmb20210029/.docker/init-zsh.sh || true # Added by Docker Desktop

# now no use
# export NVM_DIR="$HOME/.nvm"
# [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
# [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

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

#python のpath設定
export PATH=/opt/homebrew/opt/python3/libexec/bin:$PATH

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

# oh-my-zsh settings
export ZSH="$HOME/.oh-my-zsh"
ZSH_THEME="robbyrussell"
plugins=(git)
source $ZSH/oh-my-zsh.sh

# 環境依存系の読み込み
[ -f ~/.zshrc.local ] && source ~/.zshrc.local

# 文字列を標準入力としてシェルに与えて実行（した上でその返り値を取得）できる
eval $(thefuck --alias)
eval "$(starship init zsh)"

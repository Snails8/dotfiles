" 文字コード設定
set encoding=utf-8
set fileencodings=utf-8

" 基本設定
set ff=unix                " 改行コードをLFにする
set nobackup               " バックアップファイルを作らない
set noswapfile             " スワップファイルを作らない
set autoread               " 編集中のファイルが変更されたら自動で読み直す
set hidden                 " バッファが編集中でもその他のファイルを開けるように
set showcmd                " 入力中のコマンドをステータスに表示する

" 見た目
set background=dark        " 背景が暗いシンタックスカラーを適用
set number                 " 行番号の表示
set cursorline             " 現在の行を強調表示
set virtualedit=onemore    " 行末の1文字先までカーソルok
set showmatch              " 対応する括弧を強調
set laststatus=2           " ステータスラインを常に表示
set wildmode=list:longest  " コマンドラインの保管

" インデント
set smartindent            " 自動インデント
set expandtab              " ソフトタブ
set tabstop=2              " 画面上で表示する1つのタブの幅
set softtabstop=2          " tabを何文字の半スペに変更するか
set shiftwidth=2           " 自動インデントの空白数

" 検索関連
set ignorecase             " 検索文字列が小文字の場合は大文字小文字を区別なく検索する
set smartcase              " 検索文字列に大文字が含まれている場合は区別して検索する
set incsearch              " 検索文字列入力時に順次対象文字列にヒットさせる
set wrapscan               " 検索時に最後まで行ったら最初に戻る
set hlsearch               " 検索語をハイライト表示

" その他
set history=50
set backspace=indent,eol,start
syntax on


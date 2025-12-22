# M1 Mac 用のdotfiles(各種設定ファイルの同期)
## setup
初回のみsudo が必要
```shell
$ sudo curl -o - https://raw.githubusercontent.com/Snails8/dotfiles/main/install.sh | sh
```

```shell
$ curl -o - https://raw.githubusercontent.com/Snails8/dotfiles/main/install.sh | sh
```
```
$ cd dotfiles
$ chmod +x install.sh
$ make install
```

window management tool(start, stop, restart)
```shell
$ yabai --start-service
$  skhd --start-service
```



Brew の同期
```shell
# 存在していると作成できないので一旦削除したあと実行
$ brew bundle dump
```




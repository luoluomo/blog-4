(self.webpackChunkblog=self.webpackChunkblog||[]).push([[6581],{16581:n=>{n.exports="### vim 配置\n\n#### 配置\n\n* 步骤一. cp /usr/share/vim/vimrc ~/.vimrc\n* 步骤二. vi ~/.vimrc\n\n#### 可选配置\n\n```js\nset nocompatible               去掉有关 vi 一致性模式, 避免以前版本的bug和局限\n\nset nu!                        显示行号\n\nset guifont=Luxi/ Mono/ 9      设置字体, 字体名称和字号\n\nfiletype on                    检测文件的类型\n\nset history=1000               记录历史的行数\n\nset background=dark            背景使用黑色\n\nsyntax on                      语法高亮度显示\n\nset autoindent                 vim 使用自动对齐, 也就是把当前行的对齐格式应用到下一行(自动缩进）\n\nset cindent                   （cindent 是特别针对 C 语言语法自动缩进）\n\nset smartindent                依据上面的对齐格式, 智能的选择对齐方式, 对于类似 C 语言编写上有用\n\nset tabstop=4                  设置 tab 键为 4 个空格\n\nset shiftwidth =4              设置当行之间交错时使用 4 个空格\n\nset ai!                        设置自动缩进\n\nset showmatch                  设置匹配模式, 类似当输入一个左括号时会匹配相应的右括号\n\nset guioptions-=T              去除 vim 的 GUI 版本中得 toolbar\n\nset vb t_vb=                   当 vim 进行编辑时, 如果命令错误, 会发出警报, 该设置去掉警报\n\nset ruler                      在编辑过程中, 在右下角显示光标位置的状态行\n\nset nohls                      默认情况下, 寻找匹配是高亮度显示, 该设置关闭高亮显示\n\nset incsearch                  在程序中查询一单词, 自动匹配单词的位置；如查询 desk 单词, 当输到 /d 时, 会自动找到第一个 d 开头的单词, 当输入到 /de 时, 会自动找到第一个以 de 开头的单词, 以此类推, 进行查找; 当找到要匹配的单词时, 别忘记回车\n\nset backspace=2                设置退格键可用\n```\n\n### vim 快捷键\n\n```js\ndd                             快速删除当前行\n```"}}]);
CreateObject("Shell.Application").ShellExecute "cmd.exe", "/c " & WScript.Arguments(0), "", "runas"

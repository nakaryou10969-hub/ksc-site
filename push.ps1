param(
  [string]$Message = "update site"
)

Set-Location "C:\Users\nakar\site\ksc-site"

git add -A
git commit -m $Message
git push origin main

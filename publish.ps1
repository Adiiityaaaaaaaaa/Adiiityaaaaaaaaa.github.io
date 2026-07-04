# Publishes this portfolio to GitHub Pages (https://<username>.github.io/)
#
# One-time prerequisite: log in to GitHub with your PERSONAL account
# (adityapandey241@gmail.com). This script starts the login for you if needed.

$gh = Join-Path $HOME ".local\bin\gh.exe"
if (-not (Test-Path $gh)) { Write-Error "gh.exe not found at $gh"; exit 1 }

& $gh auth status 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Not logged in to GitHub - opening login (use your PERSONAL account)..." -ForegroundColor Yellow
    & $gh auth login --web --git-protocol https
    if ($LASTEXITCODE -ne 0) { Write-Error "GitHub login failed"; exit 1 }
}

# Let git push using gh's credentials
& $gh auth setup-git

$user = (& $gh api user -q .login).Trim()
$repo = "$user.github.io"
Write-Host "GitHub user: $user -> publishing to $repo" -ForegroundColor Cyan

$hasRemote = git remote get-url origin 2>$null
if (-not $hasRemote) {
    # Creates the repo, adds it as 'origin' and pushes in one step.
    # A repo named <username>.github.io serves GitHub Pages automatically from main.
    & $gh repo create $repo --public --source . --remote origin --push
    if ($LASTEXITCODE -ne 0) { Write-Error "Repo creation/push failed"; exit 1 }
} else {
    git push -u origin main
    if ($LASTEXITCODE -ne 0) { Write-Error "Push failed"; exit 1 }
}

Write-Host ""
Write-Host "Done! Your site will be live in ~1 minute at: https://$repo/" -ForegroundColor Green

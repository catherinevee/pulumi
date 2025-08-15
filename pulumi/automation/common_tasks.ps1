# PowerShell script for common Pulumi tasks
# Usage: .\common_tasks.ps1 <task>
param([string]$Task)

switch ($Task) {
    "preview" { pulumi preview }
    "up" { pulumi up }
    "destroy" { pulumi destroy }
    default { Write-Host "Unknown task. Use 'preview', 'up', or 'destroy'." }
}

# ARC/VT LLM API Migration

ARC is setup, but it requires a VPN for sending requests. I do not know if this will be an issue when we deploy, but I'll leave the instructions for the vpn here for our testing

# VPN setup

Go to https://www.nis.vt.edu/ServicePortfolio/Network/RemoteAccess-VPN.html and
follow the steps to install Cisco VPN (this is required to work with arc endpoints, see
https://docs.arc.vt.edu/usage/vscode_remote_ssh.html, specifically the 2. Prerequisites
section)

Whenever you are using the app, connect to the VPN

If a vpn ends up being required for the final version, we should probably switch to a different api
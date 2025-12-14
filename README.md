<div align="center">

# 🚀 TRAE Discord Rich Presence

### **VS Code-style Discord Rich Presence for TRAE IDE**

> Showcase your coding activity in real-time. Let your Discord friends know what you're working on!

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/Version-1.0-green.svg)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-95.2%25-3178c6.svg)](#)
[![TRAE](https://img.shields.io/badge/TRAE%20IDE-Compatible-brightgreen.svg)](#)

**[GitHub](https://github.com/HighMark-31/TRAE-Discord-Rich-Presence)** • **[Releases](https://github.com/HighMark-31/TRAE-Discord-Rich-Presence/releases)** • **[Issues](https://github.com/HighMark-31/TRAE-Discord-Rich-Presence/issues)**

</div>

---

## 📖 About

**TRAE Discord Rich Presence** is a lightweight TRAE IDE extension that integrates seamlessly with Discord to display your real-time coding activity. Similar to the popular VS Code Discord integration, this extension shows:

- 🎯 The TRAE Agent/project you're currently working on
- 📝 The type of file you're editing
- ⏰ How long you've been coding
- 🎮 Interactive Discord buttons for quick access

Keep your Discord friends and teammates instantly informed about your coding status!

---

## ✨ Features

### 🎯 Real-Time Project Display
Automatically shows the TRAE Agent and project you're actively working on in your Discord status.

### 📝 File Type Detection
Displays what type of file you're editing (JavaScript, Python, TypeScript, etc.) with intelligent detection.

### 🌍 Multi-Project Support
Seamlessly switches between multiple TRAE projects without requiring manual updates.

### 🎮 Interactive Buttons
Adds Discord Rich Presence buttons for quick access and improved user experience.

### ⚡ Lightweight & Fast
Minimal performance impact on your TRAE IDE with instant Discord integration.

### 🎨 Customizable Status
Customize how your activity is displayed to match your preferences and branding.

---

## 📦 Installation

### Quick Install (Coming Soon) ⏳

The easiest way to install TRAE Discord Rich Presence will be through the **VS Code Marketplace** or **TRAE Extensions Store**. Stay tuned for availability!

### Manual Installation

1. **Download** the latest `.vsix` file from [Releases](https://github.com/HighMark-31/TRAE-Discord-Rich-Presence/releases)
2. **Open TRAE IDE** and navigate to **Extensions → Install from VSIX...**
3. **Select** the downloaded `.vsix` file
4. **Reload** TRAE to activate the extension
5. **Authorize** Discord connection when prompted

### Build from Source

```bash
# Clone the repository
git clone https://github.com/HighMark-31/TRAE-Discord-Rich-Presence.git
cd TRAE-Discord-Rich-Presence

# Install dependencies
npm install

# Build the project
npm run package

# Package as VSIX extension
npx vsce package
```

Then install the generated `.vsix` file manually (see above).

---

## 🚀 Quick Start

### 1. Install the Extension
Follow the installation steps above to install TRAE Discord Rich Presence.

### 2. Authorize Discord Connection
When you first open TRAE, the extension will prompt you to authorize connection to Discord.

### 3. Start Coding
Open any project in TRAE IDE and begin working. Your Discord status will update automatically!

### 4. Verify Status
Check your Discord profile to see your live coding activity.

```
🚀 Working on: MyProject
📝 File: main.ts
⏰ Time: 2h 30m
```

---

## ⚙️ Configuration

Customize TRAE Discord Rich Presence through TRAE settings:

```json
{
  "trae-discord-presence.enabled": true,
  "trae-discord-presence.showFileName": true,
  "trae-discord-presence.showProjectName": true,
  "trae-discord-presence.showElapsedTime": true,
  "trae-discord-presence.customStatus": "Coding with TRAE",
  "trae-discord-presence.useButtons": true
}
```

---

## 📸 Screenshots

### Discord Profile Display
![TRAE Coding Status](https://private-user-images.githubusercontent.com/150486881/523401551-c7a66b1c-de03-418e-bb07-35cf94ae77b5.png)

### Rich Presence Details
![Rich Presence Buttons](https://private-user-images.githubusercontent.com/150486881/523401572-460a1027-0f8f-43c1-a2e1-0feb0a3138a6.png)

### TRAE IDE Integration
![TRAE Integration](https://private-user-images.githubusercontent.com/150486881/523401934-28bb007a-d8fc-4e5d-821a-0a775d0c9b49.png)

---

## 💡 Requirements

- **TRAE IDE**: v1.0 or higher
- **Discord**: Latest version with Rich Presence support
- **Node.js**: 14+ (for development/building)
- **npm**: 6+ (for development/building)

---

## 🔧 Troubleshooting

### Discord Status Not Updating
- Ensure Discord application is running
- Check that the extension is enabled in TRAE settings
- Reload TRAE IDE (press F5 or Ctrl+Shift+F5)
- Verify Discord integration is authorized

### Extension Not Installing
- Download the correct `.vsix` file for your TRAE version
- Check TRAE console (Ctrl+``) for error messages
- Try installing from Source instead

### Performance Issues
- Disable unnecessary extensions
- Check TRAE Activity Monitor for resource usage
- Report performance issues on [GitHub](https://github.com/HighMark-31/TRAE-Discord-Rich-Presence/issues)

---

## 🤝 Contributing

Contributions are welcome and appreciated! Here's how you can help:

### Report Issues
- Found a bug? [Open an issue](https://github.com/HighMark-31/TRAE-Discord-Rich-Presence/issues)
- Include your TRAE version and OS
- Provide steps to reproduce the issue

### Suggest Features
- Have an idea? [Create a feature request](https://github.com/HighMark-31/TRAE-Discord-Rich-Presence/issues)
- Describe the use case and expected behavior

### Submit Pull Requests
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
Copyright (c) 2024 HighMark-31
Licensed under MIT
```

---

## 🙏 Acknowledgments

- **TRAE IDE Community** - For inspiration and feedback
- **Discord** - For the Rich Presence API
- **VS Code Community** - For the Discord integration concept
- **Contributors** - Thanks to everyone who helps improve this project

---

## 💬 Support & Contact

- 📖 **Issues & Bugs**: [GitHub Issues](https://github.com/HighMark-31/TRAE-Discord-Rich-Presence/issues)
- 🌐 **Website**: [highmark.it](https://highmark.it)
- 💼 **Organization**: [EnderDevelopment](https://enderdevelopment.com)

---

<div align="center">

### ⭐ Show Your Support

If you find TRAE Discord Rich Presence helpful, please consider:

- **[Starring the project](https://github.com/HighMark-31/TRAE-Discord-Rich-Presence/stargazers)** ⭐
- **[Sharing with friends](https://github.com/HighMark-31/TRAE-Discord-Rich-Presence)** 📢
- **[Contributing code](https://github.com/HighMark-31/TRAE-Discord-Rich-Presence)** 🤝
- **[Reporting issues](https://github.com/HighMark-31/TRAE-Discord-Rich-Presence/issues)** 🐛

**Made with ❤️ by [HighMark-31](https://github.com/HighMark-31) for TRAE Community**

</div>

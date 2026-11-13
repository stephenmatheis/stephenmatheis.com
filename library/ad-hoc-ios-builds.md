---
title: Ad Hoc builds for personal iOS apps
type: tip
topic: 'safari & ios'
added: 2026-11-06
tags: [ios, xcode]
---

A development build run from Xcode only runs while the device has Developer Mode on. An Ad Hoc build is signed for distribution to the team's registered devices, so it runs without Developer Mode. Its certificate and profiles last a year.

Each build only covers the devices registered when it was made. Register a device once by building for it from Xcode while it's connected (`-allowProvisioningDeviceRegistration` on the command line), then make a new Ad Hoc build.

```sh
xcodebuild archive -project App.xcodeproj -scheme "App (iOS)" -configuration Release \
    -destination generic/platform=iOS -archivePath /tmp/App.xcarchive -allowProvisioningUpdates
xcodebuild -exportArchive -archivePath /tmp/App.xcarchive -exportOptionsPlist ExportOptions-AdHoc.plist \
    -exportPath /tmp/App-AdHoc -allowProvisioningUpdates
xcrun devicectl device install app --device <identifier> /tmp/App-AdHoc/App.ipa
```

On iOS 27.2, `devicectl` needs Developer Mode on to install, but the installed build keeps running with it off. Installing over an earlier build keeps an app and its Safari extension paired. Dragging the `.ipa` onto the device in Finder doesn't install it.

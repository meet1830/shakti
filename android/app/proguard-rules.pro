# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# react native fast image
-keep public class com.dylanvann.fastimage.* {*;}
-keep public class com.dylanvann.fastimage.** {*;}
-keep public class * implements com.bumptech.glide.module.GlideModule
-keep public class * extends com.bumptech.glide.module.AppGlideModule
-keep public enum com.bumptech.glide.load.ImageHeaderParser$** {
  **[] $VALUES;
  public *;
}

# Keep the Google Sign-In library classes
-keep class com.reactnativegooglesignin.** { *; }

# Keep Google Play Services and Auth classes
-keep class com.google.android.gms.auth.** { *; }
-keep class com.google.android.gms.common.** { *; }
-keep class com.google.android.gms.tasks.** { *; }

# Prevent warnings that might stop the build
-dontwarn com.google.android.gms.**

-keep class com.patelnamkeen.BuildConfig { *; }

# 1. Keep Generic Signatures (Crucial for JSON/Auth responses)
-keepattributes Signature, *Annotation*, EnclosingMethod, InnerClasses

# 2. Keep Google Play Services Internals (Aggressive)
-keep interface com.google.android.gms.common.api.Api$ApiOptions

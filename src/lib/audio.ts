import { Audio } from 'expo-av';
import { isDemoMode } from './demo';

let activeRecording: Audio.Recording | null = null;

export async function requestMicPermission(): Promise<boolean> {
  if (isDemoMode) return true;
  const { status } = await Audio.requestPermissionsAsync();
  return status === 'granted';
}

export async function startRecording(): Promise<void> {
  if (isDemoMode) return;

  await Audio.setAudioModeAsync({
    allowsRecordingIOS: true,
    playsInSilentModeIOS: true,
  });

  const { recording } = await Audio.Recording.createAsync(
    Audio.RecordingOptionsPresets.HIGH_QUALITY
  );
  activeRecording = recording;
}

export async function stopRecording(): Promise<string | null> {
  if (isDemoMode || !activeRecording) return null;

  await activeRecording.stopAndUnloadAsync();
  await Audio.setAudioModeAsync({ allowsRecordingIOS: false });

  const uri = activeRecording.getURI() ?? null;
  activeRecording = null;
  return uri;
}

export function isRecordingActive(): boolean {
  return activeRecording !== null;
}

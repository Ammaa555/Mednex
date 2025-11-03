import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface VoiceRecorderProps {
  onRecordingComplete?: (transcription: string) => void;
  label?: string;
  placeholder?: string;
  displayTranscription?: boolean;
}

export default function VoiceRecorder({
  onRecordingComplete,
  label = "Voice Recording",
  placeholder = "Describe your symptoms or health concerns...",
  displayTranscription = true,
}: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [transcription, setTranscription] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationIdRef = useRef<number | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      // Setup audio visualization
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      analyserRef.current = analyser;
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      analyser.fftSize = 256;

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        stream.getTracks().forEach((track) => track.stop());
        simulateTranscription();
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Unable to access microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    }
  };

  const simulateTranscription = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const mockTranscriptions = [
        "I have been experiencing fatigue and occasional headaches for the past two weeks. My family has a history of diabetes and I'm concerned about my health.",
        "I'm feeling stressed due to work and having trouble sleeping at night. I've also noticed some joint pain recently.",
        "Patient reports experiencing shortness of breath during physical activity and some chest discomfort. Blood pressure appears elevated.",
        "Recording indicates patient describing general malaise with recent weight gain and dietary concerns. Recommends nutrition consultation.",
        "Voice analysis shows elevated stress levels. Patient mentions recent sleep disruption and increased anxiety. Suggests lifestyle modifications.",
      ];
      const newTranscription = mockTranscriptions[Math.floor(Math.random() * mockTranscriptions.length)];
      setTranscription(newTranscription);
      setIsProcessing(false);
      if (onRecordingComplete) {
        onRecordingComplete(newTranscription);
      }
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <div className="bg-surface/30 border-2 border-surface rounded-lg p-6">
        <label className="block text-sm font-semibold text-foreground mb-4">
          🎤 {label}
        </label>

        <div className="flex gap-3 mb-4">
          <Button
            type="button"
            onClick={isRecording ? stopRecording : startRecording}
            className={`flex-1 ${isRecording ? "bg-danger hover:bg-danger/90" : "bg-primary hover:bg-primary/90"}`}
          >
            {isRecording ? "⏹ Stop Recording" : "🎤 Start Recording"}
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          {isRecording ? "🔴 Recording in progress..." : isProcessing ? "⏳ Processing audio..." : audioUrl ? "✅ Recording completed" : "Ready to record"}
        </p>

        {audioUrl && !isProcessing && (
          <audio controls className="w-full mb-4" src={audioUrl} />
        )}

        {transcription && displayTranscription && (
          <div className="bg-accent/10 border border-accent rounded-lg p-4 mt-4">
            <p className="text-sm font-semibold text-foreground mb-2">📝 Transcription:</p>
            <p className="text-sm text-foreground">{transcription}</p>
          </div>
        )}
      </div>
    </div>
  );
}

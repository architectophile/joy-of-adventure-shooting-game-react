// Check if AudioContext is supported and create a new instance
const audioContext = new (window.AudioContext ||
  (window as any).webkitAudioContext)();

export const getSound = async (url: string): Promise<AudioBufferSourceNode> => {
  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    return source;
  } catch (error) {
    throw error;
  }
};

export default audioContext;

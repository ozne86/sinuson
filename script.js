const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let oscillator;

document.addEventListener('mousemove', (event) => {
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    if (oscillator) {
        oscillator.stop();
    }

    // Generar sonido aleatorio con modulación de frecuencia y altura
    oscillator = audioContext.createOscillator();
    const frequencyModulation = (event.clientX / window.innerWidth) * 50; // Modulación de frecuencia basada en la posición X del cursor
    const amplitudeModulation = 1 - (event.clientY / window.innerHeight); // Modulación de amplitud basada en la posición Y del cursor
    
    const baseFrequency = Math.random() * 1000 + 400; // Frecuencia base aleatoria entre 400 y 1400 Hz
    const frequency = baseFrequency + frequencyModulation;
    const amplitude = 0.5 + amplitudeModulation * 0.5; // Ajusta el rango de amplitud (0.5 a 1)
    
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = 'sine';
    
    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(amplitude, audioContext.currentTime);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 1); // Detener después de 1 segundo (puedes ajustar esto)

    // Generar forma
    const shape = document.createElement('div');
    shape.classList.add('shape');

    const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    
    const randomShape = Math.random() < 0.5 ? 'rectangle' : 'circle';

    shape.style.backgroundColor = randomColor;

    if (randomShape === 'rectangle') {
        const width = Math.random() * 100 + 50; // Ancho aleatorio entre 50 y 150
        const height = Math.random() * 100 + 50; // Altura aleatoria entre 50 y 150
        const x = event.clientX - width / 2;
        const y = event.clientY - height / 2;

        shape.style.width = `${width}px`;
        shape.style.height = `${height}px`;
        shape.style.left = `${x}px`;
        shape.style.top = `${y}px`;
    } else {
        const radius = Math.random() * 50 + 25; // Radio aleatorio entre 25 y 75
        const x = event.clientX - radius;
        const y = event.clientY - radius;

        shape.style.width = `${radius * 2}px`;
        shape.style.height = `${radius * 2}px`;
        shape.style.borderRadius = '50%';
        shape.style.left = `${x}px`;
        shape.style.top = `${y}px`;
    }

    document.body.appendChild(shape);

    // Elimina la forma después de 1 segundo (puedes ajustar esto)
    setTimeout(() => {
        shape.remove();
    }, 1000);
});

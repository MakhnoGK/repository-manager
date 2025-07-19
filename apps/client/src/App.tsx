import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

function App() {
    const [message, setMessage] = useState('loading...');

    useEffect(() => {
        fetch('/api')
            .then((r) => r.text())
            .then((t) => setTimeout(() => setMessage(t + message), 3000));
    }, []);

    return (
        <div>
            <Button>Hello</Button>
            <p>Message from API: {message}</p>
        </div>
    );
}

export default App;

import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';

export default function PrivateRoute({ children }) {
  
    const { currentUser } = useAuth();
    const router = useRouter();

    if(!currentUser) {
        router.push("/auth/login")
    } else {
        return children
    }
}
import { useRouter } from 'next/router';

const Name = () => {
    const router = useRouter();
    const query = router.query;
    const {name} = query;

    return <h1>Hello {name} </h1>
}

export default Name;
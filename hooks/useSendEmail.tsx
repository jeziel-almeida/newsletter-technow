import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

const useSendEmail = () => {

    const lambda_url = process.env.NEXT_PUBLIC_URL ?? "";

    const { mutate, isSuccess, isError } = useMutation({
        mutationFn: (data: {email: string, name: string}) => {
            return axios.post(lambda_url, data)
        },
    })

    return {
        isSuccess,
        mutate,
        isError
    }
}

export default useSendEmail
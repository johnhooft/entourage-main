import { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { name, email, message } = req.body

        try {
            const { data, error } = await supabase
                .from('contacts')
                .insert([
                    { name, email, content: message }
                ])

            if (error) throw error
            res.status(200).json({ message: 'Contact form submitted successfully' })
        } catch (error) {
            console.error(error)
            res.status(500).json({ message: 'Error submitting contact form', error })
        }
    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

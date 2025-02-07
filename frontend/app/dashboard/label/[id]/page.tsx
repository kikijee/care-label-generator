import { use } from "react"
import { LabelView } from "@/app/components/LabelView";


const Page = ({ params }: { params: Promise<{ id: number }> }) => {

    const resolvedParams = use(params); // Unwrap the params promise
    const { id } = resolvedParams;

   return (
    <LabelView id={id}/>
   )
}

export default Page
export default function Value({title, text}) {
    return(
        <div className="p-4 2xl:w-1/4 2xl:p-12">
            <p className="mb-3 text-lg leading-relaxed tracking-widest uppercase">{title}</p>
            <p className="opacity-75">{text}</p>
        </div>
    )
}
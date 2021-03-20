export default function Blob({ color }) {
    return(
        <img className={`blob-${color}`} src={`/blob-${color}.svg`} alt="The Birth Mum" />
    )
}
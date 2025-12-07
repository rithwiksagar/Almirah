import { Tweet } from "react-tweet";

interface URLprops {
    URLString: string
}
export function GetPosts({ URLString }: URLprops) {
    if (!URLString) return <p>Loading...</p>;
    try {
        const url = new URL(URLString);
        if (url.hostname === "youtu.be") {
            const id = extractYtEmbed(URLString);
            const embedURL = `https://www.youtube.com/embed/${id}`
            return <div className="pt-4">
                <iframe className="w-full" src={embedURL}
                    title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; 
                encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>
        }

        if (url.hostname === "x.com") {
            const id = extractXEmbed(URLString);
            return <div className="overflow-hidden transform scale-75 md:scale-100"><Tweet id={id} /></div>
        }
    }
    catch (e) {
        return <p>error while loding...</p>
    }
}
function extractYtEmbed(URLString: string) {
    const url = new URL(URLString);
    const id = url.pathname.slice(1);
    return id;

}
function extractXEmbed(URLString: string): any {
    const url = URLString;
    const match = url.match(/status\/(\d+)/);
    const id = match ? match[1] : null;
    return id;
}






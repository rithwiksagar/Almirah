import { Tweet } from "react-tweet";

interface URLprops {
  URLString: string;
}

export function GetPosts({ URLString }: URLprops) {
  if (!URLString) return <p>Loading...</p>;

  try {
    const url = new URL(URLString);
    const host = url.hostname.replace("www.", "");

    // YouTube
    if (host === "youtu.be") {
      const id = extractYtEmbed(URLString);

      return (
        <div className="pt-4">
          <iframe
            className="w-full"
            src={`https://www.youtube.com/embed/${id}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      );
    }

    if (
      host === "x.com" ||
      host === "twitter.com" ||
      host === "mobile.twitter.com"
    ) {
      const id = extractXEmbed(URLString);

      return (
        <div className="overflow-hidden transform scale-75 md:scale-100">
          <Tweet id={id} />
        </div>
      );
    }

    const favicon = `https://www.google.com/s2/favicons?domain=${host}&sz=64`;

    return (
      <a
        href={URLString}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-40 w-full flex-col justify-between rounded-xl border border-gray-200 bg-white p-4"
      >
        <div>
          <img
            src={favicon}
            alt={host}
            className="h-10 w-10 rounded-md"
          />

          <h2 className="mt-4 text-lg font-semibold font-clashdisplay capitalize">
            {host.replace(".com", "")}
          </h2>

          <p className="mt-2 break-all text-sm text-gray-500 font-clashdisplay">
            {URLString}
          </p>
        </div>

        <div className="mt-6 text-sm font-medium font-clashdisplay">
          Click to open
        </div>
      </a>
    );
  } catch {
    return (
      <div className="flex min-h-40 items-center justify-center rounded-xl border border-red-200 bg-red-50">
        <p className="text-sm text-red-500">Invalid URL</p>
      </div>
    );
  }
}

function extractYtEmbed(urlString: string): string {
  const url = new URL(urlString);
  return url.pathname.slice(1);
}

function extractXEmbed(urlString: string): string {
  const url = new URL(urlString);

  const parts = url.pathname.split("/");
  const statusIndex = parts.indexOf("status");

  if (statusIndex !== -1 && parts[statusIndex + 1]) {
    return parts[statusIndex + 1];
  }

  throw new Error("Invalid Tweet URL");
}
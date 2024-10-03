import { Link } from "react-router-dom";
import ModalProps from "../types/modal";

const Modal: React.FC<ModalProps> = ({
    skill,
    count,
    skillRanks,
    skillPositions,
    skillUp,
    skillDown,
    skillMonths,
    onClose,
}) => {
    if (!skill) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-10 backdrop-blur-sm">
            <div className="relative w-full max-w-lg px-10 pt-8 pb-5 sm:px-12 sm:pt-12 sm:pb-8 bg-white rounded-lg shadow-xl">
                <button
                    className="absolute p-2 text-white rounded-lg top-10 right-8 bg-gray-50 hover:bg-gray-200"
                    onClick={onClose}
                >
                    <img src="/assets/icons/exit.svg" alt="exit modal" />
                </button>
                <h3 className="mb-4 text-3xl font-bold text-indigo-500">
                    {skill}
                </h3>
                <p className="mb-2 sm:text-sm text-xs text-black">
                    Ranked:{" "}
                    <span className="font-bold text-indigo-500 mr-8">
                        {skillRanks && `#${skillRanks[skill]}`}
                    </span>
                    Mentions:{" "}
                    <span className="font-bold text-indigo-500">{count}</span>{" "}
                </p>

                <hr className="my-4" />

                {skillMonths && skillMonths[skill] && (
                    <div className="mb-4 sm:text-sm text-xs text-black">
                        <p className="mb-2 font-bold">📈 Trending by month</p>
                        <ul>
                            {[
                                "june",
                                "july",
                                "august",
                                "september",
                                "october",
                            ].map((month, index, monthsArray) => {
                                const mentions = skillMonths[skill][month] || 0;
                                const previousMonthMentions =
                                    index > 0
                                        ? skillMonths[skill][
                                              monthsArray[index - 1]
                                          ] || 0
                                        : 0;

                                const percentageDifference =
                                    index > 0 &&
                                    previousMonthMentions === 0 &&
                                    mentions > 0
                                        ? "+100%"
                                        : index > 0
                                        ? calculatePercentageDifference(
                                              mentions,
                                              previousMonthMentions
                                          )
                                        : "TBA";

                                return (
                                    <li
                                        key={index}
                                        className="mb-2 sm:text-sm text-xs"
                                    >
                                        {month.charAt(0).toUpperCase() +
                                            month.slice(1)}
                                        :{" "}
                                        <span className="font-bold text-indigo-500">
                                            {mentions}
                                        </span>{" "}
                                        mentions{" "}
                                        {percentageDifference !== "TBA" && (
                                            <span
                                                className={`${
                                                    percentageDifference.startsWith(
                                                        "+"
                                                    )
                                                        ? "text-green-500 p-1 bg-indigo-50 rounded font-bold"
                                                        : "text-red-500 p-1 bg-indigo-50 rounded font-bold"
                                                } ml-2`}
                                            >
                                                {percentageDifference}
                                            </span>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}

                <hr className="my-4" />

                <p className="mb-2 font-bold sm:text-sm text-xs text-black">
                    💼 Top positions
                </p>
                <div className="flex flex-wrap">
                    {skillPositions &&
                        skillPositions[skill] &&
                        skillPositions[skill].map((industry, index) => (
                            <span
                                key={index}
                                className="inline-block px-2 py-1 mb-2 mr-2 text-xs text-black rounded bg-indigo-50"
                            >
                                {industry}
                            </span>
                        ))}
                </div>

                <hr className="my-4" />

                <p className="mb-2 font-bold sm:text-sm text-xs text-black">
                    🤓 Complimentary skills
                </p>

                {skillUp && (
                    <p className="mb-2 sm:text-sm text-xs text-black">
                        <span className="font-bold text-green-500">+</span>{" "}
                        {skillUp[0]}:{" "}
                        <span className="font-bold text-indigo-500">
                            {skillUp[1]}
                        </span>{" "}
                        mentions
                    </p>
                )}
                {skillDown && (
                    <p className="mb-2 sm:text-sm text-xs text-black">
                        <span className="font-bold text-red-500">-</span>{" "}
                        {skillDown[0]}:{" "}
                        <span className="font-bold text-indigo-500">
                            {skillDown[1]}
                        </span>{" "}
                        mentions
                    </p>
                )}

                <hr className="my-4" />

                <button
                    className="inline-flex px-5 py-3 text-sm text-white bg-indigo-500 border-2 border-indigo-500 rounded hover:bg-indigo-600 hover:bg-indigo-500 hover:shadow-md"
                    disabled
                >
                    Follow {skill}
                    <img
                        src="/assets/icons/plus.svg"
                        className="w-8 pl-3"
                        alt="exit modal"
                    />
                </button>
                <Link to={`/jobs/${skill}`}>
                    <button className="inline-flex items-center justify-center px-5 py-3 mt-2 text-sm text-indigo-500 border border-2 border-indigo-300 rounded sm:ml-3 bg-indigo-50 hover:bg-indigo-50 hover:shadow-md">
                        {skill} Jobs
                    </button>
                </Link>
            </div>
        </div>
    );
};

function calculatePercentageDifference(
    current: number,
    previous: number
): string {
    if (previous === 0) return "TBA";
    const difference = ((current - previous) / previous) * 100;
    const roundedDifference = Math.round(difference * 100) / 100;
    return roundedDifference > 0
        ? `+${roundedDifference}%`
        : `${roundedDifference}%`;
}

export default Modal;

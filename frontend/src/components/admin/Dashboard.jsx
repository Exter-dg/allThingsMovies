import AppInfoBox from "../AppInfoBox";
import LatestUploads from "../LatestUploads";

export default function Dashboard() {
	return (
		<div className="grid grid-cols-3 gap-5 p-5">
			<AppInfoBox title="Total Uploads" subtitle="100"></AppInfoBox>
			<AppInfoBox title="Total Reviews" subtitle="100"></AppInfoBox>
			<AppInfoBox title="Total Users" subtitle="100"></AppInfoBox>
			<LatestUploads></LatestUploads>
		</div>
	);
}

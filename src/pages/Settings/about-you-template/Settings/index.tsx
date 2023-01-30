import { useRef, Dispatch, SetStateAction } from "react";
import ShadowContainer from "../../../../components/organisms/ShadowContainer/ShadowContainer";
import "./index.less";
import { Settings } from "../create-about-you";

type SettingsProps = {
	setSettings: Dispatch<SetStateAction<Settings[]>>;
	settings: Settings[];
};

type SettingItemProps = {
	setting: Settings;
	index: number;
	setSettings: Dispatch<SetStateAction<Settings[]>>;
};

function index({ setSettings, settings }: SettingsProps) {
	return (
		<div>
			{settings.map((setting: any, index: number) => {
				return (
					<SettingItem
						index={index}
						setting={setting}
						setSettings={setSettings}
						key={index}
					/>
				);
			})}
		</div>
	);
}

const SettingItem = ({ setting, index, setSettings }: SettingItemProps) => {
	const ref = useRef<HTMLInputElement>(null);
	return (
		<ShadowContainer>
			<div className='checkbox-main-container'>
				<div className='checkbox-container'>
					<input
						ref={ref}
						value={setting.state.toString()}
						checked={setting.state}
						onChange={(event) => {
							setSettings((settings: any) => {
								let newSettings = settings.slice();
								newSettings[index] = {
									...newSettings[index],
									state: event.target.checked,
								};
								return newSettings;
							});
						}}
						type='checkbox'
					/>
					<div
						className='cursor-pointer'
						onClick={() => {
							if (ref.current) ref.current.click();
						}}>
						{setting.name}
					</div>
				</div>
			</div>
		</ShadowContainer>
	);
};

export default index;

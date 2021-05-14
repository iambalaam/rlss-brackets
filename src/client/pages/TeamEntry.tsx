import * as React from 'react';
import { useState, useEffect } from 'react';
import { GithubPicker } from 'react-color';
import { OnChangeHandler } from 'react-color/lib/components/common/ColorWrap';
import { TeamInfo } from '../../../@types';
import './TeamEntry.css';


function RocketLeaguePicker({ onChange }: { onChange: OnChangeHandler }) {
    const columns = 15;
    return (
        <GithubPicker
            width={`${columns * 25 + 13}px`}
            onChangeComplete={onChange}
            colors={[
                '#E5E5E5', '#FF7F7F', '#FF9F7F', '#FFCF7F', '#EFFF7F', '#AFFF7F', '#7FFF7F', '#7FFFB2', '#7FE9FF', '#7FB0FF', '#7F88FF', '#AE7FFF', '#E57FFF', '#FF7FD0', '#FF7F94',
                '#BFBFBF', '#FF5959', '#FF8259', '#FFC059', '#EAFF59', '#97FF59', '#59FF59', '#59FF9B', '#59E3FF', '#5998FF', '#5964FF', '#9659FF', '#DD59FF', '#FF59C2', '#FF5974',
                '#999999', '#FF3232', '#FF6532', '#FFB232', '#E5FF32', '#7FFF32', '#32FF32', '#32FF84', '#32DCFF', '#3281FF', '#3240FF', '#7D32FF', '#D632FF', '#FF32B4', '#FF3255',
                '#666666', '#FF0000', '#FF3F00', '#FF9F00', '#DFFF00', '#5FFF00', '#00FF00', '#00FF66', '#00D4FF', '#0061FF', '#0011FF', '#5D00FF', '#CC00FF', '#FF00A1', '#FF002A',
                '#3F3F3F', '#B20000', '#B22C00', '#B26F00', '#9CB200', '#42B200', '#00B200', '#00B247', '#0094B2', '#0044B2', '#000BB2', '#4100B2', '#8E00B2', '#B20071', '#B2001D',
                '#262626', '#660000', '#661900', '#663F00', '#596600', '#266600', '#006600', '#006628', '#005466', '#002766', '#000666', '#250066', '#510066', '#660040', '#660011',
                '#000000', '#330000', '#330C00', '#331F00', '#2C3300', '#133300', '#003200', '#003314', '#002A33', '#001333', '#000333', '#120033', '#280033', '#330020', '#330008',
            ]}
        />
    )
}

interface EmptyTeam { };
type MaybeTeam = TeamInfo | EmptyTeam;

function TeamSetup(props: { team: MaybeTeam, onChange: (team: TeamInfo) => void, deleteTeam: () => void }) {
    const team: TeamInfo = {
        id: -1,
        name: '',
        primaryColor: '#E5E5E5',
        secondaryColor: '#BFBFBF',
        player1: '',
        player2: '',
        ...props.team
    }

    // Event Handlers
    const [primaryPicker, showPrimaryPicker] = useState(false);
    const [secondaryPicker, showSecondaryPicker] = useState(false);
    const primaryOnChange: OnChangeHandler = (color) => {
        showPrimaryPicker(false);
        props.onChange({ ...team, primaryColor: color.hex });
    }
    const secondaryOnChange: OnChangeHandler = (color) => {
        showSecondaryPicker(false);
        props.onChange({ ...team, secondaryColor: color.hex });
    }

    const onChange = (field: keyof TeamInfo) => (event: React.FormEvent<HTMLInputElement>) => {
        props.onChange({ ...team, [field]: (event.target as HTMLInputElement).value });
    }

    // Window events
    const handleClickOff = () => {
        showPrimaryPicker(false);
        showSecondaryPicker(false);
    }
    useEffect(() => {
        if (primaryPicker || secondaryPicker) {
            document.addEventListener('click', handleClickOff, false);
            return () => { document.removeEventListener('click', handleClickOff); }
        }
    }, [primaryPicker, secondaryPicker]);


    return (
        <div className="team" style={{ backgroundColor: team.primaryColor, color: team.secondaryColor }}>
            <span className="primary-colorbox" onClick={(e) => { e.preventDefault(); showPrimaryPicker(true); return false; }}>
                {primaryPicker && <RocketLeaguePicker onChange={primaryOnChange} />}
            </span>
            <span className="secondary-colorbox" onClick={(e) => { e.preventDefault(); showSecondaryPicker(true); return false; }}>
                {secondaryPicker && <RocketLeaguePicker onChange={secondaryOnChange} />}
            </span>
            <input type="text" className="name" placeholder="team name" onChange={onChange('name')} value={team.name}></input>
            <input type="text" className="player1" placeholder="player 1" onChange={onChange('player1')} value={team.player1}></input>
            <input type="text" className="player2" placeholder="player 2" onChange={onChange('player2')} value={team.player2}></input>
            <span className="delete" onClick={props.deleteTeam}>❌</span>
        </div>
    )
}

export function TeamEntry() {
    const [teams, setTeams] = useState<(MaybeTeam)[]>([{}, {}, {}]);

    return (
        <div>
            <h1>Team Entry</h1>

            {teams.map((team, i) => {
                const onChange = (team: TeamInfo) => {
                    const newTeams = [...teams];
                    newTeams[i] = team;
                    setTeams(newTeams);
                };
                const deleteTeam = () => {
                    const newTeams = [...teams];
                    newTeams.splice(i, 1);
                    setTeams(newTeams);
                }
                return <TeamSetup team={team} onChange={onChange} deleteTeam={deleteTeam} />
            })}

            <div className="add" onClick={() => { setTeams([...teams, {}]) }}>➕</div>

        </div>
    );
}
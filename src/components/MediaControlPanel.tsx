import { CallEndOutlined, CheckCircleOutlined, ClosedCaptionDisabledOutlined, ClosedCaptionOffOutlined, CopyAllOutlined, InterpreterModeOutlined, KeyboardVoiceOutlined, MicOffOutlined, MonitorOutlined, PlayCircleFilled, PushPinOutlined, StopCircleOutlined, VideocamOffOutlined, VideocamOutlined } from '@mui/icons-material';
import { Box, Dropdown, IconButton, Menu, MenuButton, MenuItem, Sheet, Stack, Tooltip, } from '@mui/joy';
import { copyToClipboard } from '../helpers/helpers';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AlertDialogModal from './Alert';
import { useVoices } from '../hooks/useVoices';
import { Language } from '../helpers/i18n';

type MeetingBottomControlProps = {
    toggleAudio: any;
    toggleVideo: any;
    isAudioMuted: boolean;
    isVideoEnabled: boolean;
    toggleCaptions: any;
    isCaptionsEnabled: boolean;
    isRecording: boolean;
    leaveCall: any;
    shareScreen: () => void;
    toggleRecording: () => void;
    changeVoiceLanguage: (voiceLanguage: string) => void;
    setTranslationLanguage: ({ script }: Language) => void;
}

export function MediaControlPanel({ isAudioMuted, toggleAudio, isVideoEnabled, isRecording, toggleVideo, changeVoiceLanguage, isCaptionsEnabled, toggleCaptions, toggleRecording, leaveCall, shareScreen }: MeetingBottomControlProps) {
    const [pinned, setPinned] = useState(false)
    const [copied_icon, setCopied_icon] = useState(<CopyAllOutlined />)
    const navigate = useNavigate()
    const { t } = useTranslation();
    const [confirmRecording, setConfirmRecording] = useState(false)
    const voices = useVoices(undefined)

    async function copy() {
        if (await copyToClipboard(window.location.href)) {
            setCopied_icon(<CheckCircleOutlined />)
            setTimeout(() => {
                setCopied_icon(<CopyAllOutlined />)
            }, 2500);
        }
    }

    function endCall() {
        leaveCall()
        navigate("/")
    }

    return (
        < Sheet variant="outlined"
            sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                backgroundColor: "black",
                bottom: 0,
                position: 'fixed',
                p: 2,
                borderRadius: 8,
                mb: { xs: 4, sm: 2 }
            }}>
            {pinned ?
                <Box>
                    <Stack direction="row" spacing={2}>
                        <IconButton sx={{ m: 2 }} variant='solid' size='lg' onClick={() => setPinned(!pinned)} color='danger' >
                            <PushPinOutlined />
                        </IconButton>
                    </Stack>
                </Box> :
                <Box>
                    <Stack direction="row" spacing={2}>
                        <Tooltip title={t("meeting.microphone")}>
                            <IconButton sx={{ m: 2 }} variant='solid' size='lg' onClick={() => toggleAudio(!isAudioMuted)}>
                                {isAudioMuted ? <MicOffOutlined /> : <KeyboardVoiceOutlined />}
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={t("meeting.camera")}>
                            <IconButton sx={{ m: 2 }} variant='solid' size='lg' onClick={() => toggleVideo(!isVideoEnabled)}>
                                {isVideoEnabled ? <VideocamOutlined /> : <VideocamOffOutlined />}
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={t("meeting.share_screen")}>
                            <IconButton sx={{ m: 2 }} variant='solid' size='lg' onClick={shareScreen}>
                                <MonitorOutlined />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={t("meeting.record")}>
                            <IconButton sx={{ m: 2 }} variant='solid' size='lg' onClick={() => {
                                setConfirmRecording(!confirmRecording)
                                if (isRecording) {
                                    toggleRecording()
                                }
                            }}>
                                {isRecording ? <StopCircleOutlined className='glow-red' /> : <PlayCircleFilled />}
                            </IconButton>
                        </Tooltip>

                        <Tooltip title={t("meeting.caption")}>
                            <IconButton sx={{ m: 2 }} variant='solid' size='lg' onClick={() => toggleCaptions(!isCaptionsEnabled)}>
                                {isCaptionsEnabled ? <ClosedCaptionOffOutlined /> : <ClosedCaptionDisabledOutlined />}
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={t("meeting.copy_meeting_link")}>
                            <IconButton sx={{ m: 2 }} variant='solid' size='lg' onClick={copy}>
                                {copied_icon}
                            </IconButton>
                        </Tooltip>
                        <IconButton sx={{ m: 2 }} variant='solid' size='lg' color='danger' onClick={endCall}>
                            <CallEndOutlined />
                        </IconButton>
                        <Tooltip title={t("meeting.change_listening_language")}>
                            <Box sx={{ display: "flex", backgroundColor: "white" }} borderRadius={6}>
                                <Dropdown>
                                    <MenuButton variant="plain" size="md">
                                        <InterpreterModeOutlined />
                                    </MenuButton>
                                    <Menu
                                        placement="bottom-end"
                                        size="sm"
                                        sx={{
                                            zIndex: '99999',
                                            p: 1,
                                            gap: 1,
                                            '--ListItem-radius': 'var(--joy-radius-sm)',
                                        }}
                                    >
                                        {voices.map((l, i) => (
                                            <MenuItem onClick={() => { }} key={i} onClickCapture={() => changeVoiceLanguage(l.lang)} >
                                                <InterpreterModeOutlined />
                                                {`${l.name} (${l.lang})`}
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </Dropdown>
                            </Box>
                        </Tooltip>
                        <IconButton sx={{ m: 2 }} variant='solid' size='lg' onClick={() => setPinned(!pinned)}  >
                            <PushPinOutlined sx={{ right: 3, position: "relative" }} />
                        </IconButton>
                        {confirmRecording && <AlertDialogModal onClose={() => {
                            setConfirmRecording(false)
                        }} message={t("meeting.record_notice")} onYes={() => {
                            toggleRecording()
                        }} type={'confirm'}></AlertDialogModal>}
                    </Stack>
                </Box>
            }
        </Sheet >
    );
}

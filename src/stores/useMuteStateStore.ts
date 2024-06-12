import { create } from 'zustand'

interface TypeState {
	isMuted: boolean
	toggleMute: () => void
}

const useMuteStateStore = create<TypeState>(set => ({
	isMuted: true,
	toggleMute: () => set(state => ({ isMuted: !state.isMuted })),
}))

export default useMuteStateStore

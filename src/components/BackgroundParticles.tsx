import type { ParticlesPluginRegistrar } from '@tsparticles/react'
import { Particles, ParticlesProvider, useParticlesProvider } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

const register: ParticlesPluginRegistrar = async (engine) => {
	await loadSlim(engine)
}

const ParticlesLayer = () => {
	const { loaded } = useParticlesProvider()

	if (!loaded) return null

	return (
		<Particles
			options={{
				background: {
					image: 'url(https://www.toptal.com/designers/subtlepatterns/uploads/ep_naturalblack.png)',
				},
				style: {
					filter: 'grayscale(1) brightness(.75)',
				},
				fpsLimit: 60,
				fullScreen: true,
				particles: {
					move: { enable: true, random: true, speed: 0.25 },
					size: { value: { min: 1, max: 3 } },
					opacity: {
						animation: { enable: true, speed: 1, sync: false },
						value: { min: 0, max: 0.5 },
					},
					number: {
						density: { enable: true, width: 250, height: 250 },
						value: 50,
					},
				},
			}}
		/>
	)
}

export const BackgroundParticles = () => (
	<ParticlesProvider init={register}>
		<ParticlesLayer />
	</ParticlesProvider>
)

import { useCallback } from 'react'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import { Engine } from 'tsparticles-engine'

export const BackgroundParticles = () => {
	const particlesInit = useCallback(async (engine: Engine) => await loadFull(engine), [])

	return (
		<Particles
			init={particlesInit}
			options={{
				background: {
					image: 'url(https://www.toptal.com/designers/subtlepatterns/uploads/ep_naturalblack.png)',
				},
				style: {
					filter: 'grayscale(1) brightness(.75)',
				},
				fpsLimit: 60,
				particles: {
					move: { enable: true, random: true, speed: 0.25 },
					size: { value: { min: 1, max: 3 } },
					opacity: {
						animation: { enable: true, speed: 1, sync: false },
						value: { min: 0, max: 1 },
					},
					number: {
						density: { enable: true, area: 100 },
						value: 10,
					},
				},
			}}
		/>
	)
}

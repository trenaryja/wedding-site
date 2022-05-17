import { Map as MapContainer, Marker } from 'pigeon-maps'
import { maptiler } from 'pigeon-maps/providers'

const maptilerProvider = maptiler('wrAA6s63uzhKow7wUsFT', 'streets')
const roxianTheater: [number, number] = [40.46462738867984, -80.05895743780707]

export default function Map() {
	return (
		<MapContainer
			attribution={false}
			provider={maptilerProvider}
			height={600}
			defaultCenter={roxianTheater}
			defaultZoom={18}
		>
			<Marker width={50} anchor={roxianTheater} />
		</MapContainer>
	)
}

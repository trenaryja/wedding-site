import { Grid, Heading, Image, Link, List, ListIcon, ListItem, Text } from '@chakra-ui/react'
import { addDays, format } from 'date-fns'
import { PiDiamondsFourFill, PiPaperPlaneRightFill, PiSquareFill } from 'react-icons/pi'
import { BACHELOR_PARTY_DATE } from '../utils'

export default function Index() {
	return (
		<>
			<Grid position='relative' py={8}>
				<Image
					width={'50%'}
					opacity={0.5}
					top={'-.5rem'}
					right={'-.5rem'}
					zIndex={0}
					position='absolute'
					src='FloralCorner.png'
					alt=''
					filter={'drop-shadow(0 0 5rem white)'}
				/>
				<Image
					width={'50%'}
					transform={'rotate(180deg)'}
					opacity={0.5}
					bottom={'-.5rem'}
					left={'-.5rem'}
					zIndex={0}
					position='absolute'
					src='FloralCorner.png'
					alt=''
					filter={'drop-shadow(0 0 5rem white)'}
				/>
				<Grid zIndex={1} gap={4}>
					<Heading textAlign='center'>
						RACHEL BACHELORETTE <br /> WEEKEND
					</Heading>
					<Heading textAlign='center' size='md'>
						{format(BACHELOR_PARTY_DATE, 'MMMM dd')} - {format(addDays(BACHELOR_PARTY_DATE, 3), 'MMMM dd yyyy')}
					</Heading>
					<Text textAlign='center'>
						Thank you for coming to celebrate Rachel (and Justin) this weekend! Looking forward to showering her with
						love and excitement with you. Feel free to call or text Rachel or Emily with any questions.
					</Text>
					<Heading size='lg'>{format(BACHELOR_PARTY_DATE, `eeee 'night' | MMM dd`).toUpperCase()}</Heading>
					<List>
						<ListItem>
							<ListIcon as={PiDiamondsFourFill} />
							Check into AirBnB starting at 4pm |{' '}
							<Link href='https://www.airbnb.com/rooms/791361035137512167'>5424 Howe St. Pittsburgh, PA 15232</Link>
						</ListItem>
						<ListItem>
							<ListIcon as={PiDiamondsFourFill} />
							Decorate AirBnB
						</ListItem>
						<ListItem>
							<ListIcon as={PiDiamondsFourFill} />
							Low-key evening of appetizers for dinner & games | Activities:
							<List>
								<ListItem>
									<ListIcon as={PiPaperPlaneRightFill} />
									Power Hour Kick Off
								</ListItem>
								<ListItem>
									<ListIcon as={PiPaperPlaneRightFill} />
									Rachel's Favorite Things
									<List>
										<ListItem>
											<ListIcon as={PiSquareFill} />
											As we all know, Rachel is like Oprah for her recommendations of all her favorite items! What
											Rachel says is great and a must-have immediately requires a purchase. In the spirit of sharing
											favorite things, each person should bring an item that costs less than $25 that's a favorite item
											for a white-elephant style exchange!
										</ListItem>
									</List>
								</ListItem>
							</List>
						</ListItem>
					</List>

					<Heading size='lg'>{format(addDays(BACHELOR_PARTY_DATE, 1), `eeee | MMM dd`).toUpperCase()}</Heading>
					<List>
						<ListItem>
							<ListIcon as={PiDiamondsFourFill} />
							11:45am Ritual House Brunch Reservation |{' '}
							<Link href='https://www.ritualhousepgh.com'>534 William Penn Place Pittsburgh, PA 15219</Link>
						</ListItem>
						<ListItem>
							<ListIcon as={PiDiamondsFourFill} />
							Post Brunch (~2:00pm) Go to Rachel & Justin's Apartment for Cookout & Games
							<List>
								<ListItem>
									<ListIcon as={PiPaperPlaneRightFill} />
									Address: 434 Fifth Ave Apt 1243 Pittsburgh, PA 12519
								</ListItem>
							</List>
						</ListItem>
						<ListItem>
							<ListIcon as={PiDiamondsFourFill} />
							Evening Plans
							<List>
								<ListItem>
									<ListIcon as={PiPaperPlaneRightFill} />
									Visit the Strip District | Options:
									<List>
										<ListItem>
											<ListIcon as={PiSquareFill} />
											City Winery
										</ListItem>
										<ListItem>
											<ListIcon as={PiSquareFill} />
											The PA Market
										</ListItem>
										<ListItem>
											<ListIcon as={PiSquareFill} />
											Penn Society
										</ListItem>
										<ListItem>
											<ListIcon as={PiSquareFill} />
											Bar Marco
										</ListItem>
									</List>
								</ListItem>
							</List>
						</ListItem>
						<ListItem>
							<ListIcon as={PiDiamondsFourFill} />
							Outfit for the Day - Denim! If you have a fun denim outfit, feel free to pack it for this day. There's
							also a small pool on the rooftop of Rachel & Justin's apartment, if you want to bring a swimsuit for the
							rooftop, feel free!
						</ListItem>
					</List>

					<Heading size='lg'>{format(addDays(BACHELOR_PARTY_DATE, 2), `eeee | MMM dd`).toUpperCase()}</Heading>
					<List>
						<ListItem>
							<ListIcon as={PiDiamondsFourFill} />
							Brunch ~11:00am at Tacoya |{' '}
							<Link href='https://www.tocayopgh.com'>810 Ivy Street. Pittsburgh, PA, 15232</Link>
						</ListItem>
						<ListItem>
							<ListIcon as={PiDiamondsFourFill} />
							Travel to Ross Park Mall |{' '}
							<Link href='https://www.simon.com/mall/ross-park-mall'>1000 Ross Park Mall Dr</Link>
							<List>
								<ListItem>
									<ListIcon as={PiPaperPlaneRightFill} />
									Visit to Lush for face masks for the evening and Sephora too for any last minute spa night needs
								</ListItem>
							</List>
						</ListItem>
						<ListItem>
							<ListIcon as={PiDiamondsFourFill} />
							Dinner Plans: Salad Bar (And for Dessert a Sundae Bar!)
						</ListItem>
						<ListItem>
							<ListIcon as={PiDiamondsFourFill} />
							Spa & Girls Night in for Evening Plans | Facials, Pedicures, Fun & More
						</ListItem>
					</List>

					<Heading size='lg'>{format(addDays(BACHELOR_PARTY_DATE, 3), `eeee | MMM dd`).toUpperCase()}</Heading>
					<List>
						<ListItem>
							<ListIcon as={PiDiamondsFourFill} />
							Check out by 11:00am
						</ListItem>
						<ListItem>
							<ListIcon as={PiDiamondsFourFill} />
							Travel back to apartment and or airport
						</ListItem>
						<ListItem>
							<ListIcon as={PiDiamondsFourFill} />
							Final hugs and good vibes for the bride to be
						</ListItem>
					</List>

					<Heading size='lg'>Things to do Before the Weekend</Heading>
					<List>
						<ListItem>
							<ListIcon as={PiDiamondsFourFill} />
							Get a favorite item for Rachel's Favorite Things activity
						</ListItem>
						<ListItem>
							<ListIcon as={PiDiamondsFourFill} />
							Pack a denim outfit for Saturday if you'd like
						</ListItem>
						<ListItem>
							<ListIcon as={PiDiamondsFourFill} />
							Send any dietary restrictions or preferences to Rachel or Emily
						</ListItem>
						<ListItem>
							<ListIcon as={PiDiamondsFourFill} />
							Send travel plans to Emily or Rachel if you haven't already
						</ListItem>
					</List>
				</Grid>
			</Grid>
		</>
	)
}

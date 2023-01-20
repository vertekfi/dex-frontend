import { Box, Link } from '@chakra-ui/react';

interface Props {
  title: string;
  description: string;
  url: string;
  last?: boolean;
}

export function HomeLearnItem({ title, description, url, last }: Props) {
  return (
    <Box height="9rem" borderBottomWidth={last ? 2 : 2} borderBottomColor="vertek.neonpurple.500" mb="6" pb="6">
      <Box>
        <Link fontSize="lg" fontWeight="semibold" mb="4" href={url} target="_blank">
          {title}
        </Link>
        <Box>{description}</Box>
      </Box>
    </Box>
  );
}

import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Box,
  CircularProgress,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import { useGetGenresQuery } from '../../services/TMDB';
import './Sidebar.css';
import genreIcons from '../../assets/genres';

const blueLogo = 'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
const redLogo = 'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

const categories = [
  {
    label: 'Popular',
    value: 'popular',
  },
  {
    label: 'Top Rated',
    value: 'top_rated',
  },
  {
    label: 'Upcoming',
    value: 'upcoming',
  },
];
function Sidebar() {
  const { genreIdOrCategoryName } = useSelector((state) => state.currentGenreOrCategory);
  const theme = useTheme();
  const { data, isFetching } = useGetGenresQuery();
  const dispatch = useDispatch();
  return (
    <>
      <Link to="/" className="imageLink">
        <img
          src={theme.palette.mode === 'light' ? blueLogo : redLogo}
          alt="Filmpire Logo"
          className="image"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} className="links" to="/" style={{ color: theme.palette.text.primary, textDecoration: 'none' }}>
            <ListItem onClick={() => dispatch(selectGenreOrCategory(value))} button>
              <img
                src={genreIcons[label.toLowerCase()]}
                alt="Logo"
                className="genreImages"
                height={30}
                style={{ filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'dark' }}
              />
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (data.genres.map(({ id, name }) => (
          <Link key={id} className="links" to="/" style={{ color: theme.palette.text.primary, textDecoration: 'none' }}>
            <ListItem onClick={() => dispatch(selectGenreOrCategory(id))} button>
              <ListItemIcon>
                <img
                  src={genreIcons[name.toLowerCase()]}
                  alt="Logo"
                  className="genreImages"
                  height={30}
                  style={{ filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'dark' }}
                />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          </Link>
        )))}
      </List>
    </>
  );
}

export default Sidebar;

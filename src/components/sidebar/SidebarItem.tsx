import styled from "styled-components";
import { SidebarItemType } from "../../declarations/sidebar";
import Link from 'next/link'

const SidebarItem: React.FC<SidebarItemType> = ({
  id,
  title,
}) => {

  return (
    <ListItem>
      <Link href={`/chat/${id}`} as={`/chat/${id}`} passHref>
        <ListInner>
          {/* <IconArea>
            <Icon src={title} />
          </IconArea> */}
          <Text>{title}</Text>
        </ListInner>
      </Link>
    </ListItem>
  );
};

export default SidebarItem;

const ListItem = styled.li`
  border-bottom: 1px solid gray;
`;

const ListInner = styled.a`
  padding: 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: opacity 0.6s;

  &:hover {
    opacity: 0.6;
  }
`;

const IconArea = styled.figure`
  margin-right: 10px;
  width: 40px;
`;

const Icon = styled.img`
  width: 100%;
  border-radius: 50%;
`;

const Text = styled.p`
  width: calc(100% - 40px);
  display: block;
  font-size: 14px;
  font-weight: 400;
`;

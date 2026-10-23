import * as React from 'react';
import { useCallback } from 'react';
import {
  Body1Strong,
  Button,
  Caption1,
  Card as FluentCard,
  CardFooter,
  CardHeader,
  CardPreview,
  Image,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  mergeClasses,
} from '@fluentui/react-components';
import { MoreHorizontal20Regular } from '@fluentui/react-icons';
import { useStyles } from './Card.styles';
import type { ICardProps } from './Card.types';

export const Card = React.forwardRef<HTMLDivElement, ICardProps>(
  (
    {
      header,
      description,
      moreOptions = [],
      preview,
      footer,
      children,
      ...cardProps
    },
    ref
  ) => {
    const styles = useStyles();
    const hasMoreOptions = moreOptions.length > 0;

    const renderCardHeader = useCallback(() => {
      if (!header && !description && !hasMoreOptions) return null;

      return (
        <CardHeader
          header={
            typeof header === 'string' ? (
              <Body1Strong>{header}</Body1Strong>
            ) : (
              header
            )
          }
          description={
            typeof description === 'string' ? (
              <Caption1 className={styles.caption}>{description}</Caption1>
            ) : (
              description
            )
          }
          action={
            hasMoreOptions ? (
              <Menu>
                <MenuTrigger disableButtonEnhancement>
                  <Button
                    appearance="transparent"
                    icon={<MoreHorizontal20Regular />}
                    aria-label="More actions"
                  />
                </MenuTrigger>
                <MenuPopover>
                  <MenuList>
                    {moreOptions.map(({ key, label, ...otherProps }) => (
                      <MenuItem key={key} {...otherProps}>{label}</MenuItem>
                    ))}
                  </MenuList>
                </MenuPopover>
              </Menu>
            ) : undefined
          }
        />
      );
    }, [description, hasMoreOptions, header, moreOptions, styles.caption]);

    const renderCardPreviewOptions = useCallback(() => {
      if (!preview) return null;

      const { image, logo } = preview;

      return (
        <CardPreview
          className={mergeClasses(
            styles.grayBackground,
            styles.previewContainer
          )}
          logo={
            logo ? <Image className={styles.logoBadge} {...logo} /> : undefined
          }
        >
          <Image
            {...image}
            className={mergeClasses(
              styles.smallRadius,
              styles.previewImage,
              image.className
            )}
            alt={image.alt ?? ''}
          />
        </CardPreview>
      );
    }, [
      preview,
      styles.grayBackground,
      styles.logoBadge,
      styles.previewContainer,
      styles.previewImage,
      styles.smallRadius,
    ]);

    const renderCardFooter = useCallback(() => {
      if (!footer) return null;

      return <CardFooter>{footer}</CardFooter>;
    }, [footer]);

    return (
      <FluentCard ref={ref} {...cardProps}>
        {renderCardPreviewOptions()}
        {renderCardHeader()}
        {children}
        {renderCardFooter()}
      </FluentCard>
    );
  }
);

Card.displayName = 'Card';

/**
 * General
 * @author: oldj
 * @homepage: https://oldj.net
 */

import { useModel } from '@@/plugin-model/useModel'
import {
  Box,
  Checkbox,
  FormControl,
  FormLabel,
  FormHelperText,
  HStack,
  Radio,
  RadioGroup,
  Select,
  VStack,
} from '@chakra-ui/react'
import { ConfigsType, ThemeType } from '@root/common/default_configs'
import { LocaleName } from '@root/common/i18n'
import React from 'react'

interface IProps {
  data: ConfigsType;
  onChange: (kv: Partial<ConfigsType>) => void;
}

const General = (props: IProps) => {
  const { data, onChange } = props
  const { lang } = useModel('useI18n')

  const label_width = 20

  return (
    <VStack spacing={4}>
      <FormControl>
        <HStack>
          <FormLabel w={label_width}>{lang.language}</FormLabel>
          <Select
            w="200px"
            value={data.locale}
            onChange={e => onChange({ locale: e.target.value as LocaleName })}
          >
            <option value="zh">简体中文</option>
            <option value="en">English</option>
          </Select>
        </HStack>
      </FormControl>

      <FormControl>
        <HStack>
          <FormLabel w={label_width}>{lang.theme}</FormLabel>
          <Select
            w="200px"
            value={data.theme}
            onChange={e => onChange({ theme: e.target.value as ThemeType })}
          >
            <option value="light">{lang.theme_light}</option>
            <option value="dark">{lang.theme_dark}</option>
          </Select>
        </HStack>
      </FormControl>

      <FormControl>
        <HStack>
          <FormLabel w={label_width}>{lang.choice_mode}</FormLabel>
          <VStack align="left">
            <RadioGroup
              value={data.choice_mode.toString()}
              onChange={v => onChange({ choice_mode: parseInt(v.toString()) as ConfigsType['choice_mode'] })}
            >
              <HStack spacing={10}>
                <Radio value="1">
                  <Box>{lang.choice_mode_single}</Box>
                </Radio>
                <Radio value="2">
                  <Box>{lang.choice_mode_multiple}</Box>
                </Radio>
              </HStack>
            </RadioGroup>
            <FormHelperText>{lang.choice_mode_desc}</FormHelperText>
          </VStack>
        </HStack>
      </FormControl>

      <FormControl pt={6}>
        <HStack>
          <Checkbox
            isChecked={data.show_title_on_tray}
            onChange={e => onChange({ show_title_on_tray: e.target.checked })}
          >
            {lang.show_title_on_tray}
          </Checkbox>
        </HStack>
      </FormControl>

      <FormControl>
        <HStack>
          <Checkbox
            isChecked={data.hide_at_launch}
            onChange={e => onChange({ hide_at_launch: e.target.checked })}
          >
            {lang.hide_at_launch}
          </Checkbox>
        </HStack>
      </FormControl>

      <FormControl>
        <VStack align="left">
          <Checkbox
            isChecked={data.remove_duplicate_records}
            onChange={e => onChange({ remove_duplicate_records: e.target.checked })}
          >
            {lang.remove_duplicate_records}
          </Checkbox>
          <FormHelperText pl="20px">{lang.remove_duplicate_records_desc}</FormHelperText>
        </VStack>
      </FormControl>
    </VStack>
  )
}

export default General

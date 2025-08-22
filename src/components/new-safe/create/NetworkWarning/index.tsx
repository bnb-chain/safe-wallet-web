import { Alert, AlertTitle, Box } from '@mui/material'
import { useCurrentChain } from '@/hooks/useChains'
import ChainSwitcher from '@/components/common/ChainSwitcher'
import { useIsUnsupportedChain } from '@/hooks/useIsUnsupportedChain'
import ExternalLink from '@/components/common/ExternalLink'

const NetworkWarning = () => {
  const chain = useCurrentChain()
  const isUnsupportedChain = useIsUnsupportedChain()

  if (!chain) return null

  // Check if current chain is opBNB (chain ID 204)
  const isOpBNB = Number(chain.chainId) === 204

  const message = isUnsupportedChain ? (
    <>
      <strong>Unfortunately, creating a Safe Account on {chain.chainName} is disabled. </strong>
      {isOpBNB ? (
        <>
          Please use <ExternalLink href="https://app.safe.global/">app.safe.global</ExternalLink>.
        </>
      ) : (
        'Please switch to a supported network.'
      )}
    </>
  ) : (
    `You are trying to create a Safe Account on ${chain.chainName}. Make sure that your wallet is set to the same
      network.`
  )

  return (
    <Alert severity="warning" sx={{ mt: 3 }}>
      <AlertTitle sx={{ fontWeight: 700 }}>Change your wallet network</AlertTitle>
      {message}
      {!isUnsupportedChain && (
        <Box mt={2}>
          <ChainSwitcher />
        </Box>
      )}
    </Alert>
  )
}

export default NetworkWarning
